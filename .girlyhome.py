def edit(path, pairs):
    s = open(path).read()
    for a, b in pairs:
        assert a in s, f"NOT FOUND in {path}: {a[:70]}"
        s = s.replace(a, b)
    open(path, "w").write(s)


edit("src/components/Home.jsx", [
    ('import { MdOutlineKeyboardArrowRight } from "react-icons/md";',
     'import { MdOutlineKeyboardArrowRight } from "react-icons/md";\nimport { BsStars, BsSuitHeart } from "react-icons/bs";'),
    ('              View Portfolio\n',
     '              <BsStars className="mr-2" size={18} />\n              View Portfolio\n'),
    ("""            <img
              src={naomishiko}
              alt="Naomi"
              className="relative w-56 rounded-[1.75rem] shadow-soft sm:w-72 md:w-80"
            />""",
     """            <img
              src={naomishiko}
              alt="Naomi"
              className="relative w-56 rounded-[1.75rem] shadow-soft sm:w-72 md:w-80"
            />
            <BsSuitHeart
              className="absolute -bottom-3 -right-3 rounded-full bg-blush-500 p-1.5 text-blush-50 shadow-blush"
              size={36}
              aria-hidden="true"
            />"""),
])

print("home girly done")
