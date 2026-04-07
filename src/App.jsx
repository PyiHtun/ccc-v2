import React, { useRef, useState, useEffect } from "react";

// Custom components and hooks
import HeaderDesktop from "./component/HeaderDesktop.jsx";
import HeaderMobile from "./component/HeaderMobile.jsx";
import CustomListItems from "./component/CustomListItems.jsx";
import ServiceItem from "./component/ServiceItem.jsx";
import StepCard from "./component/StepCard.jsx";
import TapSwipeDrawer from "./component/TapSwipeDrawer.jsx";
import FloatButtonWrapper from "./component/FloatButtonWrapper.jsx";
import CookieBanner from "./component/CookieBanner.jsx";
import useWindowSize from "./hook/useWindowSize";

import "./App.css";

// Images
import logo from "./img/ccc_main_2.png";
import card1 from "./img/card-connect2-pexels.jpg";
import card2 from "./img/card-consultation-pexels.jpg";
import card3 from "./img/card-review-pexels.jpg";
import card4 from "./img/card-ccc.jpg";

import serviceHomeCare from "./img/services-home-care.png";
import serviceRespite from "./img/services-respite.png";
import serviceLD from "./img/services-LD.png";
import serviceHomeHosp from "./img/services-home-hospital.png";
import servicePersonalAssistant from "./img/services-personal.png";
import serviceMedication from "./img/services-pills.png";
import serviceNightCare from "./img/services-night-care.png";
import serviceCompanion from "./img/services-companionship.png";
import serviceSpecialist from "./img/services-specialist.png";
import serviceLiveIn from "./img/services-live-in.png";

import touchIcon from "./img/touch-32.png";

import angelaAvatar from "./assets/avatar/AngeK.png"
import thuAvatar from "./assets/avatar/TA.png"
import cccAvatar from "./img/ccc_logo.png"


// Ant Design components and icons
import { message, Alert, Layout, Col, Row, Input, Collapse, Divider, Typography, Card, ConfigProvider, theme as antdTheme } from "antd";
import {
  PhoneTwoTone,
  PhoneFilled,
  MailTwoTone,
  MailFilled,
  HeartFilled,
  SendOutlined,
  CheckCircleFilled,
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Content, Footer } = Layout;
const { Search } = Input;
const { Title, Paragraph } = Typography;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblnkvlp"; // ← replace

// Global menu items used for navigation headers
const menuItems = [
  { key: "home", label: <a href="#home">Home</a> },
  { key: "services", label: <a href="#services">Our Services</a> },
  { key: "about", label: <a href="#about">About Us</a> },
  { key: "faq", label: <a href="#faq">FAQ</a> },
  { key: "contact", label: <a href="#contact">Contact Us</a> },
];


// Style for service grid cards
const gridStyle = {
  width: "20%",
  height: "160px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const searchRef = useRef(null);
  const { width } = useWindowSize();
  const [sending, setSending] = useState(false);

  const serviceCards = [
    {
      title: "Homecare",
      displayTitle: "Homecare (Domiciliary Care)",
      logo: serviceHomeCare,
      tags: ["Daily Care"],
      description: `Our Homecare service provides personal, reliable support with everyday living from washing, dressing, and meal preparation to companionship and mobility assistance. 
      
You'll receive help right where you're most comfortable: at home. We focus on dignity, independence, and compassionate care delivered by trained, DBS-checked carers who truly care about your wellbeing. 
      
Call us today to discuss how our homecare can fit around your lifestyle.`,
    },
    {
      title: "Respite Care",
      displayTitle: "Respite Care",
      logo: serviceRespite,
      tags: ["Daily Care"],
      description: `Respite Care gives family members and regular carers a well-deserved break while ensuring their loved ones continue to receive quality support. 
      
Whether it's for a few hours, a weekend, or longer, our professional carers provide temporary cover with the same kindness and consistency as permanent staff. It's a safe, stress-free way to rest and recharge. 
      
Speak with us to arrange short-term or emergency respite care when you need it.`,
    },
    {
      title: "Home from Hospital Care",
      displayTitle: "Home from Hospital Care",
      logo: serviceHomeHosp,
      tags: ["Clinical Support"],
      description: `Recovering after a hospital stay can be daunting. Our Home-from-Hospital Care helps you transition smoothly back home with daily assistance, medication support, mobility help, and monitoring of recovery routines. 
      
We work closely with hospital discharge teams and families to reduce readmission risks and speed up rehabilitation. 
      
Contact us before discharge to plan your safe return home.`,
    },
    {
      title: "Specialist Care",
      displayTitle: "Specialist Care",
      logo: serviceSpecialist,
      tags: ["Clinical Support"],
      description: `For individuals living with complex or long-term conditions such as dementia, Parkinson's, MS, stroke recovery, or palliative needs, our Specialist Care offers expert, person-centred support. 
      
Each carer is specially trained and follows a detailed care plan developed with families and health professionals. Our goal is to preserve comfort, dignity, and quality of life every day. 
      
Call us to learn how our experienced carers can support specialist care needs.`,
    },
    {
      title: "Companionship",
      displayTitle: "Companionship",
      logo: serviceCompanion,
      tags: ["Lifestyle Support"],
      description: `Loneliness can affect anyone. Our Companionship service provides friendly, engaging carers who visit to chat, share hobbies, accompany you to appointments, or simply offer a reassuring presence. 
      
This service improves mental wellbeing, confidence, and quality of life especially for those living alone. 
      
Reach out today to arrange regular companionship visits.`,
    },
    {
      title: "Night Care",
      displayTitle: "Night Care",
      logo: serviceNightCare,
      tags: ["Daily Care"],
      description: `When peace of mind at night matters, our Night Care service ensures safety and comfort around the clock. We offer waking or sleeping night options for assistance with toileting, medication, repositioning, or reassurance during the night. 
      
Families can rest easy knowing a professional carer is on hand if anything is needed. 
      
Call us to arrange flexible overnight support that suits your routine.`,
    },
    {
      title: "Live-in Care",
      displayTitle: "Live-in Care (24-hour)",
      logo: serviceLiveIn,
      tags: ["Daily Care"],
      description: `Live-in Care provides full-time, round-the-clock support in the familiarity of your own home. A dedicated carer lives with you, offering personal care, companionship, meal prep, medication reminders, and household help tailored to your unique preferences and schedule. 
      
It's a comforting alternative to residential care, maintaining independence with complete peace of mind. 
      
Talk to us about matching you with a caring live-in professional.`,
    },
    {
      title: "Medication Administration",
      displayTitle: "Medication Administration",
      logo: serviceMedication,
      tags: ["Clinical Support"],
      description: `Taking medication correctly is vital but can be confusing especially with multiple prescriptions. Our trained carers manage medication times, doses, and records with precision and care, liaising with pharmacists or GPs if needed. 
      
We ensure you never miss or duplicate doses, keeping you safe and confident in your treatment. 
      
Call us to learn how we can support safe daily medication routines.`,
    },
    {
      title: "Personal Assistance/Outings",
      displayTitle: "Personal Assistance/Outings",
      logo: servicePersonalAssistant,
      tags: ["Lifestyle Support"],
      description: `Need an extra hand getting out and about? Our Personal Assistance and Outings service helps with errands, appointments, shopping, leisure activities, and social visits. 
      
Whether you want to stay active or simply have company while you're out, we'll make sure you travel safely and enjoyably. 
      
Book your personal assistant today and make every outing stress-free.`,
    },
    {
      title: "Autism and LD",
      displayTitle: "Autism and LD",
      logo: serviceLD,
      tags: ["Clinical Support"],
      description: `Our Autism and Learning-Disability Care provides structured, patient, and individualised support for people of all ages. 
      
We focus on communication, routine, independence, and sensory understanding delivered by carers trained to support neurodiverse individuals with empathy and respect. Families appreciate our flexible, consistent approach that builds trust and confidence. 
      
Contact us to arrange a personalised care plan for autism or learning-disability support.`,
    },
  ];
  const faqItems = [
    {
      key: "faq-1",
      label: "How quickly can care start?",
      children:
        "In many cases we can start within 24 to 72 hours after consultation and assessment.",
    },
    {
      key: "faq-2",
      label: "Can care plans be adjusted later?",
      children:
        "Yes. We review care plans regularly and can adapt schedules, visit length, and support levels as needs change.",
    },
    {
      key: "faq-3",
      label: "Do you provide short-term and long-term care?",
      children:
        "Yes. We provide one-off or short-term support, respite care, and ongoing long-term care depending on your goals.",
    },
  ];
  useEffect(() => {
    const savedTheme = localStorage.getItem("ccc-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setDarkMode(savedTheme === "dark");
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("ccc-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const host = document.getElementById("cqc-widget");
    if (!host) return;

    // Load the widget script once
    const existing = document.querySelector('script[data-cqc-widget="true"]');
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cqcWidget = "true";
    script.src =
      "https://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js" +
      "?data-id=1-26179879651&data-host=www.cqc.org.uk&type=location";

    // Observe body for whatever the widget injects, then move it into the footer container
    const observer = new MutationObserver(() => {
      // Try to find the widget root node that got injected
      // (The widget usually injects an iframe or a container with CQC branding)
      const injected =
        document.querySelector("iframe[src*='cqc.org.uk']") ||
        document.querySelector("[class*='cqc']") ||
        document.querySelector("[id*='cqc']");

      if (injected && host && !host.contains(injected)) {
        host.appendChild(injected);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      script.remove();
    };
  }, []);
  
  // Data for the About Us section
  const aboutUsData = [
    {
      avatar: cccAvatar,
      description: `At Cozy Corner Care, we believe outstanding homecare begins with compassion and clinical excellence. 
      
      Founded and managed by experienced NHS nurses, our mission is to provide personalised, professional, and heartfelt care that enables people to live safely and happily in their own homes. We understand that every person's needs are uniquethat's why our care plans are tailored, flexible, and centred around dignity, respect, and independence. 
      
      Whether it's a few hours of support a week or round-the-clock live-in care, we focus on creating meaningful relationships that promote comfort and wellbeing.`,
    }, 
    {
      avatar: angelaAvatar,
      title: "Angela Kimani - Nominated Individual",
      description: `After years working within the NHS, I've seen how the smallest acts of compassion can make the biggest difference. At Cozy Corner Care, we focus on building genuine relationships not just completing tasks. Every visit, every conversation, every smile helps someone feel safe, valued, and cared for in their own home.`,
    },
    {
      avatar: thuAvatar,
      title: "Thu Aung - Registered Manager",
      description: `Quality care isn't just about clinical skills it's about empathy, dignity, and consistency. Our team brings both medical knowledge and a human touch to every client we support. We believe in providing the same standard of care we'd want for our own families.`,
    },
  ];

  // // Displays a message
  // const showMessage = (msg) => {
  //   message.success(msg);
  // };

  // Validate email or phone number input using regex
 const handleSearch = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+?\d{1,3}[- ]?)?(?:\d[- ]?){6,14}\d$/;

  const value = (searchValue || "").trim();

  if (!emailRegex.test(value) && !phoneRegex.test(value)) {
    message.error("Invalid input! Please enter a valid email or phone number.");
    searchRef.current?.focus();
    return;
  }

  setSending(true);
  try {
    // Build payload (Formspree loves FormData)
    const formData = new FormData();
    formData.append("contact", value);           // your single input
    formData.append("page", window.location.href);
    formData.append("_gotcha", "");              // honeypot: bots tend to fill this
    formData.append("message", "Contact request from Cozy Corner Care website");
    formData.append("_subject", "CCC Website: contact lead");
    formData.append("source", "homepage-hero"); // or any page/section

    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (!res.ok) throw new Error("Network error");

    message.success("Thanks! We’ll contact you shortly.");
    setSuccessful(true);
    setSearchValue("");
    searchRef.current?.blur();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    console.error(err);
    message.error("Sorry, failed to send. Please try again.");
    searchRef.current?.focus();
  } finally {
    setSending(false);
  }
};

  const handleChange = (e) => setSearchValue(e.target.value);

  // Focus the search input when the gradient button is clicked
  // const handleGradientButtonClick = () => {
  //   if (searchRef.current) {
  //     searchRef.current.focus();
  //   }
  // };

  // Open the drawer with card details
  const showDrawer = (card) => {
    setSelectedCard(card);
    setDrawerOpen(true);
  };

  const onClose = () => setDrawerOpen(false);

  const handleCopyEmail = (email) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        message.success(`${email} copied to clipboard!`);
      })
      .catch(() => {
        message.error("Failed to copy email.");
      });
  };

  
// Optional: load analytics only after consent
function enableAnalytics() {
  // Example: Google Analytics — run ONLY after consent
  // const s = document.createElement("script");
  // s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
  // s.async = true;
  // document.head.appendChild(s);
  // window.dataLayer = window.dataLayer || [];
  // function gtag(){ window.dataLayer.push(arguments); }
  // window.gtag = gtag;
  // gtag("js", new Date());
  // gtag("config", "G-XXXXXXX");
}

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: "#015BBB" },
      }}
    >
      <Layout style={{ minHeight: "100vh", background: "var(--app-bg)", color: "var(--text-color)" }}>
      {/* Navigation Header */}
      <div id="home">
        {width < 768 ? (
          <HeaderMobile menuItems={menuItems} darkMode={darkMode} onToggleTheme={setDarkMode} />
        ) : (
          <HeaderDesktop menuItems={menuItems} darkMode={darkMode} onToggleTheme={setDarkMode} />
        )}
      </div>

      <Content className="content-container">
        <section className="hero-wrap">
          <div className="hero-inner">
            <Typography>
              <Title level={1} className="hero-title">
                Compassionate Home Care You Can Trust
              </Title>

              <Paragraph className="hero-subtitle">
                <strong>Cozy Corner Care</strong> is a <strong>Care Quality Commission(CQC) registered</strong> home care provider delivering safe, 
                professional and person-centred support across North London and Hertfordshire.
              </Paragraph>
            </Typography>
          </div> 
          <FloatButtonWrapper />
        </section>

        {/* Search Section */}
        <Row justify="center" align="center">
          <Col span={19} style={{ textAlign: "center" }}>
            <Alert
              message="Leave your contact number or email, and we'll be in touch soon..."
              description={
                <Search
                  ref={searchRef}
                  className="custom-search"
                  placeholder="Contact No. or Email"
                  enterButton={
                    successful ? <CheckCircleFilled /> : <SendOutlined />
                  }
                  size="large"
                  style={{ width: "100%" }}
                  value={searchValue}
                  onChange={handleChange}
                  onSearch={handleSearch}
                  onFocus={() => setSuccessful(false)}
                  loading={sending}          // 👈 AntD 5: shows spinner in the button
                  disabled={sending}         // 👈 optional: prevent double submits
                />
              }
              type="info"
              style={{
                marginTop: "20px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            />
          </Col>
        </Row>

        {/* Steps Section */}
        <div className="body-wrapper">
          <h2 className="seo-heading">How Our Home Care Process Works</h2>
          <div className="card-container">
            <Row gutter={32} className="card-row">
              <Col span={6}>
                <StepCard
                  step="Step-1"
                  title="Let's Connect"
                  imageSrc={card1}
                  onClick={() =>
                    showDrawer({
                      title: "Let's Connect",
                      image: card1,
                      description: `Reach out to us with your needs or concerns. We'll 
                        - listen carefully,
                        - answer any questions you have, and 
                        - gather important information about your situation, 
                      so we can begin to understand what kind of care and support will suit you best.`,
                    })
                  }
                />
              </Col>
              <Col span={6}>
                <StepCard
                  step="Step-2"
                  title="Free Consultation"
                  imageSrc={card2}
                  onClick={() =>
                    showDrawer({
                      title: "Free Consultation",
                      image: card2,
                      description: `We'll arrange a no-obligation consultation (phone, video or in-person to discuss your circumstances in more detail.

                      This helps us assess daily living needs, preferences, and routines so we can recommend the right type and level of support tailored to you.`,
                    })
                  }
                />
              </Col>
              <Col span={6}>
                <StepCard
                  step="Step-3"
                  title="Review Care Plan"
                  imageSrc={card3}
                  onClick={() =>
                    showDrawer({
                      title: "Review Care Plan",
                      image: card3,
                      description:
                        `Based on our consultation, we'll propose a personalised care plan that outlines the services, schedule, and caregiver support you'll receive, flexible and adjustable to fit your life, health, and wellbeing needs.`,
                    })
                  }
                />
              </Col>
              <Col span={6}>
                <StepCard
                  step="Step-4"
                  title="Care at Cozy Corner"
                  imageSrc={card4}
                  onClick={() =>
                    showDrawer({
                      title: "Care at Cozy Corner",
                      image: card4,
                      description:
                        `Once you approve the plan, our trusted caregivers start delivering support helping with daily tasks, personal care, household assistance or companionship. 
                        
                        We’re committed to providing safe, respectful and compassionate help so you (or your loved one) can enjoy independence and peace of mind.`,
                    })
                  }
                />
              </Col>
            </Row>

            {/* Drawer for Card Details */}
            <TapSwipeDrawer
              title={selectedCard ? selectedCard.title : "Card Details"}
              open={drawerOpen}
              onClose={onClose}
              placement="right"   // change if you use left/bottom
            >
              {selectedCard && selectedCard.image && (
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    style={{ width: "100%", maxHeight: "100px", objectFit: "cover" }}
                  />
                </div>
              )}

              {selectedCard && selectedCard.logo && (
                <div
                  style={{ textAlign: "center", marginBottom: "2px", float: "left", marginRight: "8px" }}
                  data-no-close
                >
                  <img src={selectedCard.logo} alt={selectedCard.title} style={{ width: "40px", maxHeight: "40px" }} />
                </div>
              )}

              {selectedCard ? (
                <p style={{ whiteSpace: "pre-line", marginTop: 10, lineHeight: 1.6 }}>
                  {selectedCard.description}
                </p>
              ) : (
                "Some contents..."
              )}
            </TapSwipeDrawer>
          </div>
        </div>

        {/* Services Section */}
        <div id="services">
          <div className="body-wrapper">
            <h2 className="seo-heading">Home Care Services</h2>
            <Divider orientation="left" className="divider">
              Our Services
            </Divider>
            <CustomListItems
              avatar={cccAvatar}
              description="Choosing the right care service is crucial. Explore our range of care services below, simply tap any card to view detailed information about how we can support you or your loved ones with compassionate personal care, specialist dementia support, or assistance with disabilities."
            />
            <Card>
              {serviceCards.map((service) => (
                <Card.Grid
                  key={service.title}
                  style={gridStyle}
                  className="service-card-grid"
                  onClick={() =>
                    showDrawer({
                      title: service.title,
                      logo: service.logo,
                      description: service.description,
                    })
                  }
                >
                  <ServiceItem icon={service.logo} title={service.displayTitle} />
                  <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
                </Card.Grid>
              ))}
            </Card>
          </div>
        </div>

        {/* About Us Section */}
        <div id="about">
          <div className="body-wrapper">
            <h2 className="seo-heading">About Cozy Corner Care</h2>
            <Divider orientation="left">About Us</Divider>
            <CustomListItems data={aboutUsData} />
          </div>
        </div>
        <div id="faq">
          <div className="body-wrapper">
            <h2 className="seo-heading">Frequently Asked Questions</h2>
            <Divider orientation="left">Frequently Asked Questions</Divider>
            <Card>
              <Collapse accordion items={faqItems} />
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact">
          <div className="body-wrapper">
            <h2 className="seo-heading">Contact Cozy Corner Care</h2>
            <Divider orientation="left" className="divider">
              Contact Us
            </Divider>
            <Row
              gutter={16}
              className="card-row"
              style={{ textAlign: "center" }}
            >
              <Col span={12}>
                <Card
                  title="Address"
                  size="small"
                  style={{
                    margin: "12px",
                    minHeight: "240px",
                    minWidth: "80%",
                    border: "1px solid #015BBB",
                  }}
                >
                  <p>Cozy Corner Care Ltd.,
                    <br />
                    Suit 49, 
                    <br />
                    The Wenta Business Centre,
                    <br />
                    Innova Business Park,
                    <br />
                    Electric Ave, Enfield
                    <br />
                    EN3 7XU
                  </p>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title="Contacts"
                  size="small"
                  style={{
                    margin: "12px",
                    minHeight: "240px",
                    minWidth: "80%",
                    border: "1px solid #015BBB",
                  }}
                >
                 <p
                    onClick={() => (window.location.href = "tel:02039243451")}
                    style={{
                      cursor: "pointer",
                      display: "inline-flex",      // makes <p> shrink to its content
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-color)",
                      margin: "0 auto",            // centers the inline-flex block
                      paddingBottom: "10px", 

                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      (window.location.href = "tel:02039243451")
                    }
                    title="Call us"
                    aria-label="Call Cozy Corner Care"
                  >
                    <PhoneFilled style={{ color: "#015BBB", marginRight: 8 }} />
                    0203 924 3451
                  </p>
                  <p onClick={() => handleCopyEmail("info@cozycornercare.com")}>
                    <MailFilled
                      style={{ color: "#015BBB", marginRight: "8px" }}
                    />
                    info@cozycornercare.com
                  </p>
                  <p onClick={() => handleCopyEmail("corporate@cozycornercare.com")}>
                    <MailFilled
                      style={{ color: "#015BBB", marginRight: "8px" }}
                    />
                    corporate@cozycornercare.com
                  </p>
                  <p onClick={() => handleCopyEmail("careers@cozycornercare.com")}>
                    <MailFilled
                      style={{ color: "#015BBB", marginRight: "8px" }}
                    />
                    careers@cozycornercare.com
                  </p>
                </Card>
              </Col>
            </Row>
            <div className="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2474.2038889627916!2d-0.0221966!3d51.6744109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761f85d892c037%3A0x6e4f421c8d130d3b!2sCozy%20Corner%20Care%20Limited!5e0!3m2!1sen!2suk!4v1764021263134!5m2!1sen!2suk"
                width="100%"
                height="450"
                style={{ border: 0, marginTop: "20px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Content>

      {/* Footer */}
      <Footer className="footer-container" style={{ padding: "20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Row gutter={[24, 24]}>
            {/* Brand Section */}
            <Col xs={24} md={10}>
              <div style={{ textAlign: "left" }}>
                <img
                  src={logo}
                  alt="Brand Logo"
                  style={{
                    width: "200px",
                    marginBottom: "2px",
                    marginTop: "10px",
                  }}
                />
                <p style={{ fontStyle: "italic", marginBottom: "8px", marginTop: "8px" }}>
                  Elevating care with innovation and heart. Our approach is
                  deeply personal, shaped by founders who truly understand the
                  importance of compassionate care.
                </p>
                <p>
                  © {new Date().getFullYear()} CCC Design. All rights reserved.
                </p>
              </div>
            </Col>

            {/* Quick Links Section */}
            <Col xs={24} md={4}>
              <div style={{ textAlign: "left" }}>
                <h4 style={{  marginTop: "12px", marginBottom: "16px" }}>Quick Links</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#home">Home</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#services">Our Services</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#about">About Us</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#faq">FAQ</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#contact">Contact Us</a>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Social Media Section */}
            <Col xs={24} md={10}>
              <div style={{ textAlign: "left" }}>
                <div id="cqc-widget"></div>
              </div>
            </Col>
          </Row>
        </div>
      </Footer>
      <CookieBanner onAccept={enableAnalytics} />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
