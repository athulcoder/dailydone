export async function POST(req) {
  try {
    const { fullName, username, email, password } = await req.json();

    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    let userExist = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExist) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = await signToken({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          fullName: newUser.fullName,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

    response.cookies.set("sessionid", token);
    return response;
  } catch (err) {
    console.error("Register API Error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
