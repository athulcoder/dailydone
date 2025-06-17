import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Todo } from "@/models/todo.model";
import { User } from "@/models/user.model";
import { convertDateforDB } from "@/utils/formatDate";

import { NextResponse } from "next/server";

// GET ALL TODOS
export async function GET(req) {
  try {
    await connectDB();
    const sessionid = await req.cookies.get("sessionid")?.value;

    if (!sessionid)
      NextResponse.json({ success: false, message: "User is not logged in " });

    const { email, username } = await verifyToken(sessionid);

    const _user = await User.findOne({ $or: [{ email }, { username }] });

    const todos = await Todo.find({ createdBy: _user._id });

    return NextResponse.json(
      {
        success: true,
        message: "Todos are here",
        data: todos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR FROM MY SIDE HAHAH , ", error);
  }
}

// CREATE NEW TODO
export async function POST(req) {
  try {
    await connectDB();
    const sessionid = await req.cookies.get("sessionid")?.value;
    if (!sessionid)
      NextResponse.json({ success: false, message: "User is not logged in " });

    const { email, username } = await verifyToken(sessionid);
    const _user = await User.findOne({ $or: [{ email }, { username }] });

    if (!_user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    // get the todo details from user
    const { title, description, timeNeed, dueDate, isDone } = await req.json();

    if (!title || !description || !timeNeed || !dueDate) {
      return NextResponse.json({
        success: false,
        message: "All Fields are required",
      });
    }

    const newTodo = new Todo({
      title,
      description,
      timeNeed,
      dueDate: convertDateforDB(dueDate),
      isDone,
      createdBy: _user._id,
    });

    newTodo.save();

    return NextResponse.json(
      {
        success: true,
        message: "todo added",
        data: newTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("ERROR FROM MY SIDE HAHAH , ", error);
  }
}

// UPDATE A TODO

export async function PUT(req) {
  try {
    await connectDB();
    const sessionid = await req.cookies.get("sessionid")?.value;
    if (!sessionid)
      NextResponse.json({ success: false, message: "User is not logged in " });

    const { email, username } = await verifyToken(sessionid);
    const _user = await User.findOne({ $or: [{ email }, { username }] });

    if (!_user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    // get the todo details from user
    const { searchParams } = new URL(req.url);
    const todoId = searchParams.get("tid");

    const updateTodo = await req.json();
    if (
      !updateTodo.title ||
      !updateTodo.description ||
      !updateTodo.timeNeed ||
      !updateTodo.dueDate
    ) {
      return NextResponse.json({
        success: false,
        message: "All Fields are required",
      });
    }

    updateTodo.dueDate = convertDateforDB(updateTodo.dueDate);
    const newTodo = await Todo.findByIdAndUpdate(todoId, updateTodo, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Todo Updated",
        data: newTodo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR FROM MY SIDE HAHAH , ", error);
  }
}

// DELETE TODO

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const todoId = searchParams.get("tid");

  try {
    await connectDB();

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo)
      return NextResponse.json({ success: false, message: "Todo not found" });

    return NextResponse.json({
      success: true,
      message: "Todo deleted Successfully",
    });
  } catch (error) {
    console.log("Delete request error", error);
  }
}

// SINGLE DATA UPDATE

export async function PATCH(req) {
  const { searchParams } = new URL(req.url);
  const todoId = searchParams.get("tid");

  const { isDone } = await req.json();

  try {
    await connectDB();

    await Todo.findByIdAndUpdate(
      todoId,
      { isDone },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, message: "Todo marked" });
  } catch (error) {
    console.log("error in patch", error);
  }
}
