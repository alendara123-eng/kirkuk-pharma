import React, { useRef, useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

// ✅ إعدادات مشروعك من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_t0dfv-V-MGSFfxjAoSfKAUJImGXbwQA",
  authDomain: "kirkuk-pharma-c1bd4.firebaseapp.com",
  projectId: "kirkuk-pharma-c1bd4",
  storageBucket: "kirkuk-pharma-c1bd4.appspot.com",
  messagingSenderId: "855346191511",
  appId: "1:855346191511:web:180261b98eb1c69d1c69dd2",
  measurementId: "G-TTDGZMBC7R",
};

// ✅ تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  // إرسال الكود
  const sendCode = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(
        phone,
        recaptchaVerifier.current
      );
      setVerificationId(id);
      setMsg("📲 تم إرسال الكود عبر SMS");
    } catch (e) {
      setMsg("❌ خطأ: " + e.message);
    }
  };

  // تأكيد الكود
  const confirmCode = async () => {
    try {
      const cred = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, cred);
      setMsg("✅ تسجيل الدخول تم بنجاح");
    } catch (e) {
      setMsg("❌ خطأ: " + e.message);
    }
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      <Text>رقم الجوال (مثال: +9647xxxxxxxx)</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="+9647xxxxxxxx"
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
      />
      <Button title="إرسال الكود" onPress={sendCode} />

      {verificationId && (
        <>
          <Text>أدخل الكود:</Text>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="123456"
            keyboardType="number-pad"
            style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
          />
          <Button title="تأكيد" onPress={confirmCode} />
        </>
      )}
      {!!msg && <Text>{msg}</Text>}
    </View>
  );
}
