document.getElementById("questionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // بيمنع الفورم من إنها تفتح الصفحة الخارجية المزعجة

    var form = event.target;
    var data = new FormData(form);
    var button = form.querySelector(".btn-submit");

    // تغيير نص الزرار مؤقتاً عشان يحس بالحركة
    button.disabled = true;
    button.innerText = "جاري إرسال سؤالك بالدليل... ⏳";

    // إرسال البيانات في الخلفية لموقع Formspree
    fetch("https://formspree.io/f/xvzykjzz", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // رسالة نجاح مبهجة تظهر للمستخدم بدون مغادرة الموقع
            alert("تم إرسال سؤالك بنجاح وأمان! سيصلك الرد بالدليل قريباً إن شاء الله. 🌟");
            form.reset(); // تفريغ الخانات بعد الإرسال
        } else {
            alert("عذراً، حدثت مشكلة أثناء الإرسال. يرجى المحاولة مرة أخرى.");
        }
    }).catch(error => {
        alert("عذراً، حدث خطأ في الاتصال بالشبكة.");
    }).finally(() => {
        // إرجاع الزرار لوضعه الطبيعي بعد الانتهاء
        button.disabled = false;
        button.innerText = "إرسال السؤال بالدليل 🚀";
    });
});