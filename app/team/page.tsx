<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meet the Team - Yale Pitch Book</title>
    <style>
        :root {
            --yale-blue: #0f4d92;
            --yale-accent: #00356b;
            --light-gray: #f5f5f5;
            --medium-gray: #e0e0e0;
            --dark-gray: #333333;
            --white: #ffffff;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
        }
        
        body {
            background-color: var(--white);
            color: var(--dark-gray);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background-color: var(--yale-blue);
            color: var(--white);
            padding: 20px 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: var(--white);
            text-decoration: none;
        }
        
        .logo span {
            color: var(--medium-gray);
        }
        
        nav ul {
            display: flex;
            list-style: none;
        }
        
        nav ul li {
            margin-left: 30px;
        }
        
        nav ul li a {
            color: var(--white);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        nav ul li a:hover {
            color: var(--medium-gray);
        }
        
        .hero {
            background-color: var(--yale-accent);
            color: var(--white);
            padding: 60px 0;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: 800;
        }
        
        .hero p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .team-section {
            padding: 80px 0;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 60px;
        }
        
        .section-title h2 {
            font-size: 2.5rem;
            color: var(--yale-blue);
            margin-bottom: 15px;
            font-weight: 700;
        }
        
        .section-title p {
            color: var(--dark-gray);
            max-width: 700px;
            margin: 0 auto;
        }
        
        .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 40px;
            margin-top: 40px;
        }
        
        .team-member {
            background-color: var(--white);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .team-member:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .member-img {
            height: 300px;
            width: 100%;
            background-color: var(--medium-gray);
            position: relative;
            overflow: hidden;
        }
        
        .member-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .member-info {
            padding: 25px;
            text-align: center;
        }
        
        .member-info h3 {
            font-size: 1.4rem;
            margin-bottom: 5px;
            color: var(--yale-blue);
        }
        
        .member-role {
            color: var(--dark-gray);
            font-weight: 500;
            margin-bottom: 15px;
        }
        
        .member-bio {
            font-size: 0.95rem;
            color: var(--dark-gray);
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
        }
        
        .social-links a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: var(--light-gray);
            color: var(--yale-blue);
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .social-links a:hover {
            background-color: var(--yale-blue);
            color: var(--white);
        }
        
        .cta-section {
            background-color: var(--light-gray);
            padding: 80px 0;
            text-align: center;
        }
        
        .cta-content {
            max-width: 700px;
            margin: 0 auto;
        }
        
        .cta-content h2 {
            font-size: 2.2rem;
            color: var(--yale-blue);
            margin-bottom: 20px;
        }
        
        .cta-content p {
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .cta-btn {
            display: inline-block;
            background-color: var(--yale-blue);
            color: var(--white);
            padding: 12px 30px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }
        
        .cta-btn:hover {
            background-color: var(--yale-accent);
        }
        
        footer {
            background-color: var(--yale-blue);
            color: var(--white);
            padding: 40px 0;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        
        .footer-logo {
            flex: 1;
            min-width: 200px;
            margin-bottom: 20px;
        }
        
        .footer-logo a {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--white);
            text-decoration: none;
        }
        
        .footer-links {
            flex: 2;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        
        .footer-column {
            min-width: 150px;
            margin-bottom: 20px;
        }
        
        .footer-column h3 {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: var(--white);
        }
        
        .footer-column ul {
            list-style: none;
        }
        
        .footer-column ul li {
            margin-bottom: 10px;
        }
        
        .footer-column ul li a {
            color: var(--medium-gray);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .footer-column ul li a:hover {
            color: var(--white);
        }
        
        .copyright {
            text-align: center;
            padding-top: 30px;
            margin-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.9rem;
            color: var(--medium-gray);
        }
        
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
            }
            
            nav ul {
                margin-top: 20px;
            }
            
            nav ul li {
                margin-left: 15px;
                margin-right: 15px;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .section-title h2 {
                font-size: 2rem;
            }
            
            .footer-content {
                flex-direction: column;
            }
            
            .footer-links {
                flex-direction: column;
            }
        }
    </style>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">Yale<span>PitchBook</span></a>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="pitch.html">Pitch</a></li>
                        <li><a href="team.html">Team</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Meet Our Team</h1>
            <p>The talented individuals behind Yale PitchBook working to connect Yale's brightest entrepreneurs with the resources they need to succeed.</p>
        </div>
    </section>

    <section class="team-section">
        <div class="container">
            <div class="section-title">
                <h2>Leadership Team</h2>
                <p>Our dedicated leadership team brings together expertise in entrepreneurship, finance, and business development to guide Yale's next generation of founders.</p>
            </div>
            
            <div class="team-grid">
                <!-- Team Member 1 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Executive Director">
                    </div>
                    <div class="member-info">
                        <h3>Emily Zhang</h3>
                        <div class="member-role">Executive Director</div>
                        <p class="member-bio">MBA '23, with previous experience at Goldman Sachs and several successful startup exits. Emily oversees all PitchBook operations and strategy.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
                
                <!-- Team Member 2 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Managing Director">
                    </div>
                    <div class="member-info">
                        <h3>Michael Chen</h3>
                        <div class="member-role">Managing Director</div>
                        <p class="member-bio">Yale School of Management '24, previously founded two tech startups and worked at McKinsey. Michael leads our investor relations and pitch events.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
                
                <!-- Team Member 3 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Program Director">
                    </div>
                    <div class="member-info">
                        <h3>Aisha Johnson</h3>
                        <div class="member-role">Program Director</div>
                        <p class="member-bio">Yale College '23, Computer Science major with experience in startup acceleration at Y Combinator. Aisha manages our coaching and mentorship programs.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section-title" style="margin-top: 80px;">
                <h2>Advisory Board</h2>
                <p>Distinguished alumni and industry experts who provide strategic guidance and support to our mission.</p>
            </div>
            
            <div class="team-grid">
                <!-- Advisor 1 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Faculty Advisor">
                    </div>
                    <div class="member-info">
                        <h3>Dr. Robert Wilson</h3>
                        <div class="member-role">Faculty Advisor</div>
                        <p class="member-bio">Professor of Entrepreneurship at Yale School of Management, with 20+ years of experience in venture capital and business development.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
                
                <!-- Advisor 2 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Investor Advisor">
                    </div>
                    <div class="member-info">
                        <h3>Sarah Patel</h3>
                        <div class="member-role">Investor Advisor</div>
                        <p class="member-bio">Yale '07, Managing Partner at Horizon Ventures with expertise in early-stage funding for tech and healthcare startups.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
                
                <!-- Advisor 3 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Alumni Advisor">
                    </div>
                    <div class="member-info">
                        <h3>David Huang</h3>
                        <div class="member-role">Alumni Advisor</div>
                        <p class="member-bio">Yale '02, Founder and CEO of TechForward, previously led product development at Amazon and Microsoft.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section-title" style="margin-top: 80px;">
                <h2>Student Team</h2>
                <p>Passionate Yale students who drive our day-to-day operations, event planning, and startup support initiatives.</p>
            </div>
            
            <div class="team-grid">
                <!-- Student 1 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Marketing Lead">
                    </div>
                    <div class="member-info">
                        <h3>Jason Kim</h3>
                        <div class="member-role">Marketing Lead</div>
                        <p class="member-bio">Yale College '25, Economics major. Jason manages our social media presence, email campaigns, and event promotions.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
                
                <!-- Student 2 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Operations Coordinator">
                    </div>
                    <div class="member-info">
                        <h3>Maya Rodriguez</h3>
                        <div class="member-role">Operations Coordinator</div>
                        <p class="member-bio">Yale School of Management '25. Maya oversees our pitch events, workshops, and coordinates with campus partners.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
                
                <!-- Student 3 -->
                <div class="team-member">
                    <div class="member-img">
                        <img src="/api/placeholder/400/320" alt="Tech Lead">
                    </div>
                    <div class="member-info">
                        <h3>Alex Thompson</h3>
                        <div class="member-role">Tech Lead</div>
                        <p class="member-bio">Yale College '24, Computer Science major. Alex manages our digital platform, database of startups, and technical resources.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-github"></i></a>
                            <a href="#"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="container">
            <div class="cta-content">
                <h2>Join Our Network</h2>
                <p>Are you a Yale student with a startup idea or an investor looking to connect with Yale's entrepreneurial talent? Get in touch with our team today.</p>
                <a href="contact.html" class="cta-btn">Contact Us</a>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <a href="index.html">YalePitchBook</a>
                    <p style="margin-top: 15px;">Connecting Yale entrepreneurs with resources, mentorship, and investment opportunities.</p>
                </div>
                
                <div class="footer-links">
                    <div class="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="pitch.html">Pitch Events</a></li>
                            <li><a href="team.html">Team</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h3>Resources</h3>
                        <ul>
                            <li><a href="#">Pitch Deck Templates</a></li>
                            <li><a href="#">Startup Guide</a></li>
                            <li><a href="#">Investment FAQ</a></li>
                            <li><a href="#">Yale Entrepreneur Network</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h3>Connect</h3>
                        <ul>
                            <li><a href="#"><i class="fab fa-linkedin-in"></i> LinkedIn</a></li>
                            <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
                            <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
                            <li><a href="#"><i class="far fa-envelope"></i> Email Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="copyright">
                <p>&copy; 2025 Yale PitchBook. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>
