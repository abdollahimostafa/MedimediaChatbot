// sms.ts

const USERNAME = "989124964145";
const PASSWORD = "Mm@123456";
const ORIGINATOR = "50002121314"; // your SMS line number

// generic SMS sender
export const sendSMS = async (mobile: string, message: string) => {
  const url = `https://negar.armaghan.net/sms/url_send.html?originator=${ORIGINATOR}&destination=${mobile}&content=${encodeURIComponent(
    message
  )}&password=${PASSWORD}&username=${USERNAME}`;

  try {
    const res = await fetch(url, { method: "GET" });
    const text = await res.text(); // full response as plain text

    const lines = text.trim().split("\n");
    const isSuccess = lines[0]?.toLowerCase().includes("success");

    return {
      success: isSuccess,
      referenceId: isSuccess ? lines[2]?.trim() : null, // you'll get the ID here
      rawResponse: text,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

// login verification code sender
export const sendSMSCode = async (mobile: string, code: string) => {
  const message = `کد ورود شما: ${code}\nبایو ویو | موج سلامتی هوشمند  \nپیشرو در سلامت دیجیتال, هوش مصنوعی و اینترنت اشیاء\n Biowave.ir \n 02144778044`;
  return await sendSMS(mobile, message);
};
