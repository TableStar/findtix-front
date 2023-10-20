const Footer = () => {

    return <section className="footer-section flex flex-col gap-4 md:gap-8 bg-[#d2633b] text-gray-50 mt-5 py-4 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-left gap-4">
            <div className="find-events flex flex-col gap-1">
                <h1 className="font-medium md:text-[18px]">Find Events</h1>
                <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <p >Events in Your Area</p>
                    <p>Business Events</p>
                    <p>Music Events</p>
                </div>
            </div>

            <div className="create-events flex flex-col gap-1">
                <h1 className="font-medium md:text-[18px]">Create Events</h1>
                <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <p>Create Events</p>
                    <p>Event Marketing</p>
                    <p>FAQs</p>
                </div>
            </div>

            <div className="plan-events flex flex-col gap-1">
                <h1 className="font-medium md:text-[18px]">Plan Events</h1>
                <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <p>Sell Tickets Online</p>
                    <p>Event Planning</p>
                    <p>Event Check-In</p>
                </div>
            </div>

            <div className="contact-us flex flex-col gap-1">
                <h1 className="font-medium md:text-[18px]">Contact Us</h1>
                <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <p>Customer Support</p>
                    <p>LinkedIn</p>
                    <p>Facebook</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-center text-center gap-4 text-xs md:text-sm">
            <p>© 2023 FindTIX</p>
            <p className="flex flex-row flex-wrap justify-center gap-1">
                <span>About</span>·
                <span>Blog</span>·
                <span>Help</span>·
                <span>Customer Support</span>·
                <span>Contact Sales</span>·
                <span>Careers</span>·
                <span>Terms</span>·
                <span>Privacy</span>·
                <span>Accessibility</span>·
                <span>Cookies</span>·
            </p>
            <p>Surabaya</p>
        </div>
    </section>
}

export default Footer;