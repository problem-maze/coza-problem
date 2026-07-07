using UnityEngine;
using UnityEngine.UI;

// ═══════════════════════════════════════════════════════════════
//  STEP 1 — Login screen shell: background + WORLD / SIGN IN / WARNING pills
//  Matches Coza's real values exactly:
//    --bg           = #040608
//    pill border    = rgba(255,255,255,0.4)   (rgba(255,255,255,0.9) if active)
//    pill fill      = transparent              (rgba(255,255,255,0.08) if active)
//    pill height    = 28px  -> we use 56 Unity units (2x for crisper text)
//    label          = font-size 8.5px, letter-spacing 2px, color rgba(--ice,0.55)
//    --ice          = rgb(225,235,248)
//    warning icon   = rgba(220,60,50,0.95)  (red, distinct from the blue system)
//
//  HOW TO USE:
//   1. Create an empty GameObject in your scene (right-click Hierarchy → Create Empty).
//   2. Drag this script onto it.
//   3. Press Play. The whole header row builds itself — no manual UI setup needed.
//   4. Screenshot the result and send it back so we can compare against the real page.
// ═══════════════════════════════════════════════════════════════
public class CozaLoginShell : MonoBehaviour
{
    static readonly Color32 BG        = new Color32(0x04, 0x06, 0x08, 0xFF);
    static readonly Color32 ICE       = new Color32(225, 235, 248, 140);   // 0.55 alpha
    static readonly Color32 PILL_BORDER      = new Color32(255, 255, 255, 102); // 0.4
    static readonly Color32 PILL_BORDER_ON   = new Color32(255, 255, 255, 230); // 0.9
    static readonly Color32 PILL_FILL_ON     = new Color32(255, 255, 255, 20);  // 0.08
    static readonly Color32 WARN_RED  = new Color32(220, 60, 50, 242);     // 0.95

    void Start()
    {
        // ── Canvas (root) ──────────────────────────────────────────
        var canvasGO = new GameObject("CozaCanvas", typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
        var canvas = canvasGO.GetComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        var scaler = canvasGO.GetComponent<CanvasScaler>();
        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1080, 1920);

        // ── Full-screen background (--bg: #040608) ──────────────────
        var bgGO = new GameObject("Background", typeof(Image));
        bgGO.transform.SetParent(canvasGO.transform, false);
        var bgImg = bgGO.GetComponent<Image>();
        bgImg.color = BG;
        var bgRT = bgGO.GetComponent<RectTransform>();
        bgRT.anchorMin = Vector2.zero; bgRT.anchorMax = Vector2.one;
        bgRT.offsetMin = Vector2.zero; bgRT.offsetMax = Vector2.zero;

        // ── Pill row container ───────────────────────────────────────
        var rowGO = new GameObject("PillRow", typeof(HorizontalLayoutGroup));
        rowGO.transform.SetParent(canvasGO.transform, false);
        var rowRT = rowGO.GetComponent<RectTransform>();
        rowRT.anchorMin = new Vector2(0.5f, 1f);
        rowRT.anchorMax = new Vector2(0.5f, 1f);
        rowRT.pivot = new Vector2(0.5f, 1f);
        rowRT.anchoredPosition = new Vector2(0, -140);
        var layout = rowGO.GetComponent<HorizontalLayoutGroup>();
        layout.spacing = 16;
        layout.childAlignment = TextAnchor.MiddleCenter;
        layout.childForceExpandWidth = false;
        layout.childForceExpandHeight = false;

        BuildPill(rowGO.transform, "\U0001F310", "WORLD",   active: true);
        BuildPill(rowGO.transform, "\U0001F441", "SIGN IN", active: false);
        BuildPill(rowGO.transform, "!",          "WARNING", active: false, iconColor: WARN_RED);
    }

    void BuildPill(Transform parent, string icon, string label, bool active, Color32? iconColor = null)
    {
        var pillGO = new GameObject($"Pill_{label}", typeof(Image), typeof(HorizontalLayoutGroup), typeof(LayoutElement));
        pillGO.transform.SetParent(parent, false);

        var img = pillGO.GetComponent<Image>();
        img.sprite = RoundedRectSprite(56, 20);
        img.type = Image.Type.Sliced;
        img.color = active ? PILL_FILL_ON : new Color32(0, 0, 0, 0);

        // Border — a second rounded-rect image behind, slightly larger, outline-only look
        var borderGO = new GameObject("Border", typeof(Image));
        borderGO.transform.SetParent(pillGO.transform, false);
        var borderImg = borderGO.GetComponent<Image>();
        borderImg.sprite = RoundedRectOutlineSprite(56, 20, 3);
        borderImg.type = Image.Type.Sliced;
        borderImg.color = active ? PILL_BORDER_ON : PILL_BORDER;
        var borderRT = borderGO.GetComponent<RectTransform>();
        borderRT.anchorMin = Vector2.zero; borderRT.anchorMax = Vector2.one;
        borderRT.offsetMin = Vector2.zero; borderRT.offsetMax = Vector2.zero;

        var le = pillGO.GetComponent<LayoutElement>();
        le.preferredHeight = 56;
        le.preferredWidth = 30 + label.Length * 13;

        var innerLayout = pillGO.GetComponent<HorizontalLayoutGroup>();
        innerLayout.padding = new RectOffset(14, 20, 0, 0);
        innerLayout.spacing = 10;
        innerLayout.childAlignment = TextAnchor.MiddleLeft;
        innerLayout.childForceExpandWidth = false;
        innerLayout.childForceExpandHeight = false;

        var iconGO = new GameObject("Icon", typeof(Text));
        iconGO.transform.SetParent(pillGO.transform, false);
        var iconText = iconGO.GetComponent<Text>();
        iconText.text = icon;
        iconText.font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
        iconText.fontSize = 26;
        iconText.color = iconColor ?? (active ? (Color)PILL_BORDER_ON : (Color)PILL_BORDER);
        iconText.alignment = TextAnchor.MiddleCenter;
        iconGO.AddComponent<LayoutElement>().preferredWidth = 28;

        var labelGO = new GameObject("Label", typeof(Text));
        labelGO.transform.SetParent(pillGO.transform, false);
        var labelText = labelGO.GetComponent<Text>();
        labelText.text = label;
        labelText.font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
        labelText.fontSize = 17;                 // ≈ 8.5px source × 2 (our reference res is 2x)
        labelText.color = ICE;
        labelText.alignment = TextAnchor.MiddleLeft;
        labelText.fontStyle = FontStyle.Normal;
        // Letter-spacing isn't native to legacy Text — closest approximation:
        // pad each character with a thin space if you need wider tracking visually.
    }

    // Procedural rounded-rect fill sprite (radius in px, size in px, 9-sliced)
    Sprite RoundedRectSprite(int size, int radius)
    {
        var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
        for (int y = 0; y < size; y++)
            for (int x = 0; x < size; x++)
                tex.SetPixel(x, y, InRoundedRect(x, y, size, radius) ? Color.white : new Color(0, 0, 0, 0));
        tex.Apply();
        return Sprite.Create(tex, new Rect(0, 0, size, size), new Vector2(0.5f, 0.5f), 100,
            0, SpriteMeshType.FullRect, new Vector4(radius, radius, radius, radius));
    }

    // Outline-only version (stroke width in px)
    Sprite RoundedRectOutlineSprite(int size, int radius, int stroke)
    {
        var tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
        for (int y = 0; y < size; y++)
            for (int x = 0; x < size; x++)
            {
                bool outer = InRoundedRect(x, y, size, radius);
                bool inner = InRoundedRect(x, y, size, radius, stroke);
                tex.SetPixel(x, y, (outer && !inner) ? Color.white : new Color(0, 0, 0, 0));
            }
        tex.Apply();
        return Sprite.Create(tex, new Rect(0, 0, size, size), new Vector2(0.5f, 0.5f), 100,
            0, SpriteMeshType.FullRect, new Vector4(radius, radius, radius, radius));
    }

    bool InRoundedRect(int x, int y, int size, int radius, int inset = 0)
    {
        float minX = inset, minY = inset, maxX = size - inset, maxY = size - inset;
        float r = Mathf.Max(1, radius - inset);
        if (x >= minX + r && x <= maxX - r) return y >= minY && y <= maxY;
        if (y >= minY + r && y <= maxY - r) return x >= minX && x <= maxX;
        float cx = x < minX + r ? minX + r : maxX - r;
        float cy = y < minY + r ? minY + r : maxY - r;
        return (x - cx) * (x - cx) + (y - cy) * (y - cy) <= r * r;
    }
}
