import { NextRequest, NextResponse } from "next/server";

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx5mw8nFGTcNifmg0_QnytU2MQYVLcMK5Lzj0l2o5aZphsQLTwflQX5HrNR7AjEf6Y/exec";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { status: "error", message: "Email is required" },
        { status: 400 }
      );
    }

    // Forward to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({
        status: "success",
        message: "Lead submitted successfully!",
      });
    } else {
      throw new Error(data.message || "Failed to submit lead");
    }
  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to submit lead. Please try again.",
      },
      { status: 500 }
    );
  }
}
