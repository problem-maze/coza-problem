#!/bin/bash
# ═══════════════════════════════════════════════════════════
#  Claude Code Security Setup — Ubuntu (proot-distro/Termux)
#  شغّله مرة واحدة جوّه Ubuntu وهو يظبّط كل حاجة
#  الاستخدام: bash setup_claude_security.sh
# ═══════════════════════════════════════════════════════════

set -e

echo ""
echo "════════════════════════════════════════"
echo "  Claude Code Security Setup"
echo "════════════════════════════════════════"
echo ""

# ── 1. PATH ──────────────────────────────────────────────
echo "▶ 1/4 ظبط PATH..."
if ! grep -q '.local/bin' ~/.bashrc 2>/dev/null; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
  echo "  ✅ PATH اتضاف لـ ~/.bashrc"
else
  echo "  ✅ PATH موجود بالفعل"
fi
export PATH="$HOME/.local/bin:$PATH"

# ── 2. امسح النسخة القديمة من npm ──────────────────────
echo ""
echo "▶ 2/4 مسح النسخة القديمة..."
if [ -f /usr/bin/claude ]; then
  npm -g uninstall @anthropic-ai/claude-code 2>/dev/null || true
  echo "  ✅ النسخة القديمة اتمسحت"
else
  echo "  ✅ مفيش نسخة قديمة"
fi

# ── 3. ثبّت النسخة الجديدة وظبّط install method ──────────
echo ""
echo "▶ 3/4 تظبيط Claude Code..."
claude install 2>/dev/null || true
echo "  ✅ Install method اتظبّط"

# ── 4. أنشئ مجلد للمشاريع وسكريبت الفحص ──────────────
echo ""
echo "▶ 4/4 إنشاء مجلد المشاريع..."
mkdir -p ~/projects

cat > ~/security-check.sh << 'SCAN'
#!/bin/bash
# ═══════════════════════════════════════════════════════
#  Security Review — شغّله على أي ملف HTML
#  الاستخدام: bash security-check.sh اسم_الملف.html
# ═══════════════════════════════════════════════════════

export PATH="$HOME/.local/bin:$PATH"

FILE=${1:-"work.html"}

if [ ! -f "$FILE" ]; then
  echo "❌ الملف مش موجود: $FILE"
  echo "   انقل الملف هنا الأول، بعدين شغّل:"
  echo "   bash security-check.sh $FILE"
  exit 1
fi

echo ""
echo "════════════════════════════════════════"
echo "  Security Review: $FILE"
echo "  $(wc -l < $FILE) سطر"
echo "════════════════════════════════════════"
echo ""

# ابدأ Claude Code وشغّل الفحص
claude --print "/security-review" < /dev/null
echo ""
echo "افتح الملف وشغّل:"
echo "  /security-review"
SCAN

chmod +x ~/security-check.sh

echo "  ✅ سكريبت الفحص جاهز في ~/security-check.sh"

# ── تأكيد نهائي ──────────────────────────────────────
echo ""
echo "════════════════════════════════════════"
echo "  ✅ الإعداد اكتمل!"
echo "════════════════════════════════════════"
echo ""
echo "الخطوات الجاية:"
echo ""
echo "1. انقل ملفك لـ Ubuntu:"
echo "   (من Termux في تاب جديد):"
echo "   cp ~/downloads/work.html \\"
echo "     /data/data/com.termux/files/usr/var/lib/proot-distro/installed-rootfs/ubuntu/root/"
echo ""
echo "2. جوّه Ubuntu شغّل:"
echo "   cd ~"
echo "   claude"
echo "   ثم اكتب: /security-review"
echo ""
source ~/.bashrc 2>/dev/null || true
