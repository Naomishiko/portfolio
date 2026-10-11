def edit(path, pairs):
    s = open(path).read()
    for a, b in pairs:
        assert a in s, f"NOT FOUND in {path}: {a[:70]}"
        s = s.replace(a, b)
    open(path, "w").write(s)


SPARK_L = '<BsStars className="mr-2 inline align-middle text-blush-300" size={22} />'
SPARK_R = '<BsStars className="ml-2 inline align-middle text-blush-300" size={22} />'

edit("src/components/About.jsx", [
    ('import React from "react";', 'import React from "react";\nimport { BsStars } from "react-icons/bs";'),
    ('About <span className="accent-text">Me</span>',
     SPARK_L + 'About <span className="accent-text">Me</span>' + SPARK_R),
])

edit("src/components/Experience.jsx", [
    ('import React from "react";', 'import React from "react";\nimport { BsStars } from "react-icons/bs";'),
    ('Exper<span className="accent-text">ience</span>',
     SPARK_L + 'Exper<span className="accent-text">ience</span>' + SPARK_R),
])

edit("src/components/Portfolio.jsx", [
    ('import React from "react";', 'import React from "react";\nimport { BsStars } from "react-icons/bs";'),
    ('Port<span className="accent-text">folio</span>',
     SPARK_L + 'Port<span className="accent-text">folio</span>' + SPARK_R),
])

edit("src/components/Contact.jsx", [
    ('import React from "react";', 'import React from "react";\nimport { BsStars } from "react-icons/bs";'),
    ('Cont<span className="accent-text">act</span>',
     SPARK_L + 'Cont<span className="accent-text">act</span>' + SPARK_R),
])

edit("src/components/Home.jsx", [
    ('import { MdOutlineKeyboardArrowRight } from "react-icons/md";',
     'import { MdOutlineKeyboardArrowRight } from "react-icons/md";\nimport { BsStars, BsSuitHeart } from "react-icons/bs";'),
    ('                View Portfolio',
     '                <BsStars className="mr-2" size={18} />\n                View Portfolio'),
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

print("girly decor done")
