import React from "react";
import logo from '../../assets/logo.svg';

const Footer=()=>{
    return(
        <>
          <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
            
                * {
                    font-family: "Poppins", sans-serif;
                }
            `}</style>
            <footer className='bg-gradient-to-r from-white via-green-200/60 to-white mt-40 py-12 px-4 sm:px-6 lg:px-8 text-black-500'>
                <div className='w-full max-w-7xl mx-auto'>
            
                    <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
            
                        <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
                            <a href="https://prebuiltui.com">
                                <img src={logo} alt="logo" className="h-11 w-auto"></img>
                            </a>
                            <div className='w-full max-w-52 h-px mt-8 bg-linear-to-r from-black via-white/25 to-black'></div>
                            <p className='text-sm text-black-500 mt-6 max-w-sm leading-relaxed'>
                                Resume. is a powerful AI-powered resume builder designed to help job seekers create professional and tailored resumes with ease. With its user-friendly interface and advanced features, Resume. simplifies the resume creation process, allowing users to generate impressive resumes that stand out to employers. Whether you're a recent graduate or an experienced professional, Resume. provides the tools and guidance needed to craft a compelling resume that highlights your skills and achievements effectively.
                            </p>
                        </div>
            
                        <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className='text-sm text-black-500 font-medium'>Important Links</h3>
                            <div className="flex flex-col gap-2 mt-6">
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>Home</a>
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>About</a>
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>Portfolio</a>
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>Contact</a>
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>FAQ</a>
                            </div>
                        </div>
            
                        <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className='text-sm text-black-500 font-medium'>Social Links</h3>
                            <div className="flex flex-col gap-2 mt-6">
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>Twitter</a>
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>Instagram</a>
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>Youtube</a>
                                <a href="#" className='text-sm text-black-500 hover:text-black transition-colors'>Linkedin</a>
                            </div>
                        </div>
            
                        <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className='text-sm text-black-500 font-medium'>Subscribe to practise your interview skills</h3>
                            <div className="flex items-center border gap-2 border-black-500/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
                                <input type="email" placeholder="Enter your email.." className="w-full h-full pl-6 outline-none text-sm bg-transparent text-black-500 placeholder:text-black-500/60 placeholder:text-xs" required />
                                <button type="submit" className="bg-[#A6FF5D] hover:bg-[#92ec4d] active:scale-95 transition w-56 h-10 rounded-full text-sm text-gray-800 font-medium cursor-pointer mr-1.5">Subscribe</button>
                            </div>
                        </div>
            
                    </div>
            
                    <div className='w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black'></div>
            
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className='text-xs text-white/60'>© 2026 Resume.</p>
                        <div className="flex items-center gap-6">
                            <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Terms & Conditions</a>
                            <div className='w-px h-4 bg-white/20'></div>
                            <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>


        </>
    )
}

export default Footer;