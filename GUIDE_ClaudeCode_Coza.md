# دليل Claude Code في Termux — Coza Project

## الدخول (كل مرة من الأول)

```bash
# 1. افتح Termux
# 2. ادخل Ubuntu
proot-distro login ubuntu

# 3. روح لمجلد الشغل وشغّل Claude
cd ~/system && claude
```

---

## الهيكل الموجود على جهازك

```
Ubuntu (جوه Termux)
├── ~/system/
│   ├── CLAUDE.md        ← قواعد Claude المخصصة
│   ├── .claude/         ← إعدادات Claude Code
│   ├── cache/
│   ├── memory/
│   ├── scripts/
│   └── templates/
│
└── ~/projects/
    └── Coza_19.html     ← آخر ملف شغلنا عليه في Claude Code
```

---

## ملفات Coza على الجهاز (في Download)

```
/storage/emulated/0/Download/
├── Ander_147.html           ← نسخة قديمة
├── Ander_148.html           ← بعد إصلاح 3 bugs
├── Coza_1.html              ← أول نسخة باسم Coza
├── Coza_1_edited.html       ← فيها hero message محدث
├── Coza_29_unified_color.html ← أحدث نسخة (الحالية)
└── ...
```

---

## CLAUDE.md — القواعد المخصصة

```
# Project: Ander — Problem The Maze Eyes
Single HTML PWA ~32000 lines
File: /storage/emulated/0/Download/...

# Stack
SVG globe, Canvas, CSS themes, vanilla JS
PWA, 10 languages, RTL, mobile-first

# Thinking Rules
- Think before acting
- Read target lines first
- Spot side effects before editing
- If unsure, ask one question

# Output Rules
- str_replace only, never full rewrite
- Show WHAT changed and WHY (1 line)
- No long explanations
- No code unless asked
```

---

## إزاي تجيب أحدث ملف من Download لـ projects

```bash
# انسخ أحدث ملف للشغل عليه
cp /storage/emulated/0/Download/Coza_29_unified_color.html ~/projects/Coza_29.html
```

---

## الموديل الحالي

```
Claude Code v2.1.195
Opus 4.8
~/system
```

### تغيير الموديل (لو محتاج)
```bash
# جوه Claude Code
/config
# بعدين ابحث عن "model" وغيّره
```

---

## الأوامر المهمة جوه Claude Code

```
/config     ← إعدادات الموديل والثيمات
/usage      ← كام توكن استخدمت
/exit       ← اخرج من Claude Code
?           ← قائمة كل الأوامر
```

---

## Workflow الصح

```
1. Claude Chat (هنا)
   └── نتكلم ونخطط ونقرر إيه المهمة

2. Claude Code (Termux)
   └── ينفذ التعديل الفعلي على الملف
   └── str_replace فقط، مش rewrite كامل

3. Claude Chat (هنا تاني)
   └── نراجع النتيجة
   └── نحمل الملف المعدل ونجربه
```

---

## إزاي تبعت مهمة لـ Claude Code

بعد ما تدخل Ubuntu وتشغّل claude، ابعتله:

```
Work on /root/projects/Coza_29.html

[وصف المهمة هنا]

Use str_replace only.
```

---

## الـ Bugs اللي اتصلحت في Claude Code خلال الجلسة دي

1. **Morocco وAlgeria** — اتشالوا من مجموعة `fr` في LANG_COUNTRIES
2. **Arabic Q&A** — اتوسعت من 5 لـ 20 سؤال وجواب
3. **Lite Mode تلقائي** — FPS threshold نزل من 18 لـ 10
4. **p_liteMode localStorage** — بيتمسح عند كل تحميل
5. **Sphere picker loop** — cancelAnimationFrame عند الإغلاق
6. **Overlay reparenting** — نقل القائمة لـ body لإصلاح position:fixed

---

## ملاحظة مهمة

الملف `Coza_29_unified_color.html` موجود في:
- **Download** على جهازك (للتجربة في المتصفح)
- **Claude Chat Project "Coza"** (للنقاش والتخطيط)
- **~/projects/** في Ubuntu (للتعديل عبر Claude Code)

الثلاثة لازم يكونوا متزامنين — بعد أي تعديل في Claude Code، انسخ الملف للـ Download:

```bash
cp ~/projects/Coza_29.html /storage/emulated/0/Download/Coza_29_updated.html
```
