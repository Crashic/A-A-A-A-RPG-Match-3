// Иконки рас и классов по макету «Иконки рас/классов» (тема «Агитпроп»): плитка как у фишек (градиент hi → bg → lo, блик),
// знак тёмным ink. Цвет — фракция: Совет красный, Союз зелёный, Пресса синий. Ключ иконки — t:<id>, рисует iconTile → originTileSvg.
const ORIGIN_TILE_PAL = {"council": {"hi": "#ff6a5a", "bg": "#c8221a", "lo": "#7a1210", "ink": "#3a0806"}, "union": {"hi": "#9be07a", "bg": "#4f9a32", "lo": "#26561a", "ink": "#122c0a"}, "press": {"hi": "#8ec8ff", "bg": "#2f6fc0", "lo": "#173a70", "ink": "#0a1a38"}};
const ORIGIN_TILE_GLYPHS = {
"column": "<path d=\"M18 8h64v12H18zM28 20h44v24l-8 6 6 8-10 4v30H28z\"/><path d=\"M14 86h50v8H14z\"/>",
"factory": "<path d=\"M6 92V48l22 14V48l22 14V48l22 14V12h14v80z\"/><path d=\"M14 72h8v8h-8zM34 72h8v8h-8zM54 72h8v8h-8z\" fill=\"BG\"/>",
"tunnel": "<path d=\"M6 92V50a44 44 0 0 1 88 0v42H72V54a22 22 0 0 0-44 0v38z\"/><path d=\"M36 92l4-26h20l4 26h-6l-3-20h-10l-3 20z\"/>",
"horse": "<path d=\"M24 92l6-34-16-10 8-14 20 4 14-30 6 14 22 18-6 10-14-6-4 16 8 32h-12l-6-24h-10l-4 24z\"/>",
"spruce": "<path d=\"M50 4l18 26H58l20 26H64l24 26H12l24-26H22l20-26H32z\"/><path d=\"M44 82h12v14H44z\"/>",
"paper": "<path d=\"M10 14h70v66a8 8 0 0 0 8 8H18a8 8 0 0 1-8-8z\"/><path d=\"M80 30h10v50a5 5 0 0 1-10 0z\"/><path d=\"M20 24h50v14H20zM20 46h22v4H20zM48 46h22v4H48zM20 56h22v4H20zM48 56h22v4H48zM20 66h22v4H20zM48 66h22v4H48z\" fill=\"BG\"/>",
"gear": "<path d=\"M44 8h12l2 12 9 4 10-7 8 8-7 10 4 9 12 2v12l-12 2-4 9 7 10-8 8-10-7-9 4-2 12H44l-2-12-9-4-10 7-8-8 7-10-4-9-12-2V44l12-2 4-9-7-10 8-8 10 7 9-4z\"/><circle cx=\"50\" cy=\"50\" r=\"14\" fill=\"BG\"/>",
"binoc": "<rect x=\"8\" y=\"34\" width=\"34\" height=\"52\" rx=\"10\"/><rect x=\"58\" y=\"34\" width=\"34\" height=\"52\" rx=\"10\"/><path d=\"M16 14h18v20H16zM66 14h18v20H66zM42 44h16v18H42z\"/><circle cx=\"25\" cy=\"70\" r=\"9\" fill=\"BG\"/><circle cx=\"75\" cy=\"70\" r=\"9\" fill=\"BG\"/>",
"flag": "<path d=\"M14 6h8v88h-8z\"/><path d=\"M22 10h66l-14 20 14 20H22z\"/><path d=\"M44 20l4 8h8l-6 5 2 8-8-5-8 5 2-8-6-5h8z\" fill=\"BG\"/>",
"wrench": "<path d=\"M70 10a20 20 0 0 0-18 27L14 75a8 8 0 0 0 11 11l38-38A20 20 0 0 0 90 30l-12 12-12-4-4-12 12-12a20 20 0 0 0-4-4z\"/>",
"horn": "<path d=\"M8 38h18l50-28v80L26 62H8z\"/><path d=\"M26 62l8 30h12l-6-28z\"/><path d=\"M82 34q10 16 0 32\" stroke=\"INK\" stroke-width=\"6\" fill=\"none\"/>",
"key": "<circle cx=\"30\" cy=\"36\" r=\"22\"/><circle cx=\"30\" cy=\"36\" r=\"9\" fill=\"BG\"/><path d=\"M44 50l40 40 8-8-8-8 8-8-8-8 6-6-24-24z\"/>",
"fire": "<path d=\"M50 6q30 30 24 58a24 24 0 0 1-48 0q-2-16 10-26 0 14 10 16Q38 30 50 6z\"/><path d=\"M12 86l76 8v-6L12 80z\"/>",
"hammer": "<path d=\"M22 14h44l10 10v12H56v52a6 6 0 0 1-12 0V36H22z\"/>",
"mask": "<path d=\"M6 32q44-16 88 0q-4 34-26 36-10 0-18-10-8 10-18 10Q10 66 6 32z\"/><path d=\"M20 38q10-4 18 4q-8 8-18-4zM62 42q8-8 18-4q-10 12-18 4z\" fill=\"BG\"/>",
"axe": "<path d=\"M40 30h10v64H40z\" transform=\"rotate(-30 50 50)\"/><path d=\"M30 10q44-6 56 26-26 2-36 22-14-24-20-48z\"/>",
"mushroom": "<path d=\"M6 50Q8 10 50 10Q92 10 94 50z\"/><path d=\"M38 50h24l4 40H34z\"/><circle cx=\"30\" cy=\"34\" r=\"6\" fill=\"BG\"/><circle cx=\"62\" cy=\"26\" r=\"5\" fill=\"BG\"/>",
"bush": "<circle cx=\"30\" cy=\"58\" r=\"22\"/><circle cx=\"70\" cy=\"58\" r=\"22\"/><circle cx=\"50\" cy=\"38\" r=\"24\"/><path d=\"M8 72h84v16H8z\"/><circle cx=\"40\" cy=\"44\" r=\"5\" fill=\"BG\"/><circle cx=\"62\" cy=\"54\" r=\"5\" fill=\"BG\"/>",
"compass": "<circle cx=\"50\" cy=\"50\" r=\"44\"/><circle cx=\"50\" cy=\"50\" r=\"34\" fill=\"BG\"/><path d=\"M50 18l10 32-10 32-10-32z\"/><circle cx=\"50\" cy=\"50\" r=\"5\" fill=\"BG\"/>",
"hourglass": "<path d=\"M16 6h68v10h-6q0 22-20 34 20 12 20 34h6v10H16V84h6q0-22 20-34-20-12-20-34h-6z\"/><path d=\"M32 84q0-14 18-24 18 10 18 24z\" fill=\"BG\"/>",
"radio": "<path d=\"M20 8l40 22-4 6-40-22z\"/><rect x=\"6\" y=\"32\" width=\"88\" height=\"58\" rx=\"8\"/><circle cx=\"32\" cy=\"61\" r=\"16\" fill=\"BG\"/><path d=\"M58 46h26v6H58zM58 58h26v6H58zM58 70h26v6H58z\" fill=\"BG\"/>",
"antenna": "<path d=\"M48 30h4v64h-4z\"/><circle cx=\"50\" cy=\"26\" r=\"8\"/><path d=\"M28 10q-12 16 0 32M72 10q12 16 0 32M18 4q-20 24 0 44M82 4q20 24 0 44\" stroke=\"INK\" stroke-width=\"5\" fill=\"none\"/>"
};
const ORIGIN_TILES = {"ruiners": {"g": "column", "pal": "council"}, "factory": {"g": "factory", "pal": "council"}, "underAdm": {"g": "tunnel", "pal": "council"}, "steppe": {"g": "horse", "pal": "union"}, "forest": {"g": "spruce", "pal": "union"}, "underFree": {"g": "tunnel", "pal": "union"}, "press": {"g": "paper", "pal": "press"}, "engineer": {"g": "gear", "pal": "council"}, "scout": {"g": "binoc", "pal": "council"}, "guard": {"g": "flag", "pal": "council"}, "technician": {"g": "wrench", "pal": "council"}, "overseer": {"g": "horn", "pal": "council"}, "keeper": {"g": "key", "pal": "council"}, "nomad": {"g": "fire", "pal": "union"}, "mechanic": {"g": "hammer", "pal": "union"}, "raider": {"g": "mask", "pal": "union"}, "forester": {"g": "axe", "pal": "union"}, "herbalist": {"g": "mushroom", "pal": "union"}, "ambusher": {"g": "bush", "pal": "union"}, "guide": {"g": "compass", "pal": "union"}, "archivist": {"g": "hourglass", "pal": "press"}, "bard": {"g": "radio", "pal": "press"}, "chronicler": {"g": "antenna", "pal": "press"}};
