import React from "react";
import { HiOutlineMail } from "react-icons/hi";

const SocialLinks = () => {

    const links = [

{
id: 1,
child: (
    <>
     Mail <HiOutlineMail size={30} />
    </>
),
href:"mailto:njivoon@gmail.com",
},


];

  return (
  <div className="flex flex-col top-[35%] left-0 fixed">
      <ul>

{links.map(({id, child, href, download }) => (
<li 
key={id}
className={
 "flex justify-between items-center w-40 h-24 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-orange-900"
}
>
    <a
    href={href}
  className="flex justify-between items-center w-full
   text-white"
  download={download}
  target="_blank"
  rel="noreferrer"
> 
{child}
</a>
</li>
))}
</ul>
  </div>
 ); 
};

export default SocialLinks;