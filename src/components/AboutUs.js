import React from 'react';
import './AboutUs.css'; // Import CSS for styling

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1>About Us</h1>
            
            <section>
                <h2>About the Founder</h2>
                <p>
                    My name is Tebogo Manyubele, the founder of TurfBizApp. I graduated from the University of Limpopo with a 
                    BSc in Molecular and Life Sciences and completed my Honours degree in Biochemistry in 2024. My academic background, 
                    combined with a passion for technology and problem-solving, led to the creation of this app to address 
                    common challenges faced by students and landlords around Turfloop.
                </p>
            </section>

            <section>
                <h2>About TurfBizApp</h2>
                <p>
                    TurfBizApp is a platform designed to simplify life at Turfloop by providing students with easy access 
                    to available rooms around the university. Our primary goal is to reduce the hassle students face when 
                    searching for accommodation and help landlords connect with potential tenants efficiently.
                </p>
                <p>
                    With TurfBizApp, landlords can list their properties, highlight key amenities, and include house rules 
                    upfront so that students know what to expect before applying. This approach helps reduce misunderstandings 
                    and creates a smoother renting process for everyone.
                </p>
                <p>The app is currently under development, with more features to be added in the near future.</p>
            </section>

            <section>
                <h2>Meet the TurfBizApp Team</h2>
                <p>
                    Our dedicated team consists of University of Limpopo alumni from diverse fields, including science, technology, 
                    business, and the arts. Together, we are committed to providing innovative solutions that benefit the Turfloop 
                    community. Each team member brings a unique skill set, contributing to the success and continuous improvement of 
                    TurfBizApp.
                </p>
            </section>

            <section>
                <h2>Our Goals</h2>
                <ul>
                    <li>Provide a reliable platform for students to find suitable accommodation quickly and easily.</li>
                    <li>Offer landlords an effective way to reach potential tenants without unnecessary delays.</li>
                    <li>Expand the app’s functionality to serve other businesses in Turfloop.</li>
                </ul>
            </section>

            <section>
                <h2>Our Mission</h2>
                <p>
                    Our mission is to bridge the gap between students and landlords by creating a seamless and user-friendly platform 
                    that meets the accommodation needs of the Turfloop community.
                </p>
            </section>

            <section>
                <h2>Our Vision</h2>
                <p>
                    We envision a future where students no longer have to walk around in search of rooms and landlords don’t miss 
                    business opportunities due to poor communication. Our long-term goal is to make TurfBizApp the go-to platform 
                    for all local services in Turfloop.
                </p>
            </section>

            <section>
                <h2>Future Direction</h2>
                <p>
                    As TurfBizApp evolves, we plan to expand its scope beyond student accommodation by including other services 
                    such as food delivery, transportation, and local business promotions. Our aim is to create a thriving ecosystem 
                    that benefits the entire Turfloop community.
                </p>
            </section>

            <section>
                <h2>Contact Us</h2>
                <p><strong>Founder’s Contact:</strong> 061 704 8855</p>
                <p><strong>Email:</strong> turfbizapp@gmail.com</p>
                <p>If you have any questions, suggestions, or would like to collaborate with us, feel free to reach out. We’d love to hear from you!</p>
            </section>
        </div>
    );
};

export default AboutUs;
