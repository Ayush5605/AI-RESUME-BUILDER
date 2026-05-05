import React from "react";
import { BookUserIcon } from "lucide-react";
import Title from "./Title";

const Testimonial=({title,description})=>{
    return(
                <div  id="testimonial" className='flex flex-col items-center my-10 scroll-mt-12'>
                     <div className="flex items-center gap-2 text-sm text-green-600  bg-green-400/10 rounded-full px-6 py-1.5">
                       <BookUserIcon className="size-4.5 stroke-green-600"/>
            
                        <span>Testimonials</span>
                      </div>
                 <Title title='Dont just take our words' description=" Hear what our
                 users day about us.We're always looking for ways to improve.If you have
                 a positive experience, we'd love to hear about it!"/>
                
                
                
                 </div>

    )
}

export default Testimonial;