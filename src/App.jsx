import React, { useRef, useState } from "react";

// Custom components and hooks
import HeaderDesktop from "./component/HeaderDesktop.jsx";
import HeaderMobile from "./component/HeaderMobile.jsx";
import CustomListItems from "./component/CustomListItems.jsx";
import GradientButton from "./component/GradientButton.jsx";
import ServiceItem from "./component/ServiceItem.jsx";
import StepCard from "./component/StepCard.jsx";
import TapSwipeDrawer from "./component/TapSwipeDrawer.jsx";
import FloatButtonWrapper from "./component/FloatButtonWrapper.jsx";
import useWindowSize from "./hook/useWindowSize";

import "./App.css";

// Images
import logo from "./img/ccc_main_2.png";
import card1 from "./img/card-connect-pexels.jpg";
import card2 from "./img/card-consultation-pexels.jpg";
import card3 from "./img/card-review-pexels.jpg";
import card4 from "./img/card-ccc.jpg";
// import carousel11 from "./img/temp/Gemini_Gen_1.png";
// import carousel22 from "./img/temp/carousel-pexels.jpg";
// import carousel33 from "./img/temp/phone.jpg";
// import carousel44 from "./img/temp/bp.jpg";
// import carousel55 from "./img/temp/nathan-anderson.jpg";

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

// Ant Design components and icons
import {
  message,
  Alert,
  Layout,
  Col,
  Row,
  Input,
  Divider,
  Typography,
  Carousel,
  FloatButton,
  Drawer,
  Card,
  Skeleton,
  Flex,
  Tag,
  Descriptions,
} from "antd";
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

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Title, Paragraph, Text, Link } = Typography;

// Global menu items used for navigation headers
const menuItems = [
  { key: "home", label: <a href="#home">Home</a> },
  { key: "services", label: <a href="#services">Our Services</a> },
  { key: "about", label: <a href="#about">About Us</a> },
  { key: "contact", label: <a href="#contact">Contact Us</a> },
];

// Custom FloatButton group for quick contact actions
// const FloatButtonWrapper = () => (
//   <FloatButton.Group
//     shape="circle"
//     size="large"
//     style={{
//       position: "fixed",
//       bottom: 20,
//       right: 20,
//       zIndex: 9999,
//     }}
//   >
//     <FloatButton
//       icon={<PhoneTwoTone style={{ fontSize: 20 }}/>}
//       onClick={() => (window.location.href = "tel:02039243451")}
//       style={{
//         backgroundColor: "#015BBB",
//         color: "#015BBB",
//         width: 60,
//         height: 60,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     />
//     <FloatButton
//       icon={<MailTwoTone />}
//       style={{
//         backgroundColor: "#015BBB",
//         color: "#015BBB",
//         width: 60,
//         height: 60,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//       onClick={() => {
//         const contactSection = document.getElementById("contact");
//         if (contactSection) {
//           contactSection.scrollIntoView({ behavior: "smooth" });
//         }
//       }}
//     />
//   </FloatButton.Group>
// );

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const searchRef = useRef(null);
  const { width } = useWindowSize();

  // Data for the About Us section
  const aboutUsData = [
    {
      description: `At Cozy Corner Care, we believe outstanding homecare begins with compassion and clinical excellence. 
      
      Founded and managed by experienced NHS nurses, our mission is to provide personalised, professional, and heartfelt care that enables people to live safely and happily in their own homes. We understand that every person's needs are uniquethat's why our care plans are tailored, flexible, and centred around dignity, respect, and independence. 
      
      Whether it's a few hours of support a week or round-the-clock live-in care, we focus on creating meaningful relationships that promote comfort and wellbeing.`,
    }, 
    {
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=17",
      title: "Angela Kimani - Nominated Individual",
      description: `After years working within the NHS, I've seen how the smallest acts of compassion can make the biggest difference. At Cozy Corner Care, we focus on building genuine relationships not just completing tasks. Every visit, every conversation, every smile helps someone feel safe, valued, and cared for in their own home.`,
    },
    {
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=9",
      title: "Thu Aung - Registered Manager",
      description: `Quality care isn't just about clinical skills it's about empathy, dignity, and consistency. Our team brings both medical knowledge and a human touch to every client we support. We believe in providing the same standard of care we'd want for our own families.`,
    },
  ];

  // // Displays a message
  // const showMessage = (msg) => {
  //   message.success(msg);
  // };

  // Validate email or phone number input using regex
  const handleSearch = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+?\d{1,3}[- ]?)?(?:\d[- ]?){6,14}\d$/;
    if (emailRegex.test(searchValue) || phoneRegex.test(searchValue)) {
      console.log("Valid input:", searchValue);
      message.success("Success!");
      setSuccessful(true);
      setSearchValue("");
      if (searchRef.current) {
        searchRef.current.blur();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.error(
        "Invalid input! Please enter a valid email or phone number.",
      );
      message.error(
        "Invalid input! Please enter a valid email or phone number.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Refocus the input
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }
  };

  const handleChange = (e) => setSearchValue(e.target.value);

  // Focus the search input when the gradient button is clicked
  const handleGradientButtonClick = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

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

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* Navigation Header */}
      <div id="home">
        {width < 768 ? (
          <HeaderMobile menuItems={menuItems} />
        ) : (
          <HeaderDesktop menuItems={menuItems} />
        )}
      </div>

      <Content className="content-container">
        {/* Carousel Section */}
        <div>
          <FloatButtonWrapper />
        </div>
        {/* Search Section */}
        <Row justify="center" align="center">
          <Col span={21} style={{ textAlign: "center" }}>
            <Alert
              message="Leave your contact number or email, and we'll be in touch soon..."
              description={
                <Search
                  ref={searchRef}
                  className="custom-search"
                  placeholder="Contact Number or Email"
                  enterButton={
                    successful ? <CheckCircleFilled /> : <SendOutlined />
                  }
                  size="large"
                  style={{ width: "100%" }}
                  value={searchValue}
                  onChange={handleChange}
                  onSearch={handleSearch}
                  onFocus={() => setSuccessful(false)}
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
            <Divider orientation="left" className="divider">
              Our Services
            </Divider>
            <CustomListItems
              avatar="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
              description="Choosing the right care service is crucial. Explore our range of care services below, simply tap any card to view detailed information about how we can support you or your loved ones with compassionate personal care, specialist dementia support, or assistance with disabilities."
            />
            <Card>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Homecare care",
                    logo: serviceHomeCare,
                    description:
                      `Our Homecare service provides personal, reliable support with everyday living from washing, dressing, and meal preparation to companionship and mobility assistance. 
                      
                      You'll receive help right where you're most comfortable: at home. We focus on dignity, independence, and compassionate care delivered by trained, DBS-checked carers who truly care about your wellbeing. 
                      
                      Call us today to discuss how our homecare can fit around your lifestyle.`,
                  })
                }
              >
                <ServiceItem
                  icon={serviceHomeCare}
                  title="Homecare care (Domiciliary care)"
                />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Respite care",
                    logo: serviceRespite,
                    description:
                      `Respite Care gives family members and regular carers a well-deserved break while ensuring their loved ones continue to receive quality support. 
                      
                      Whether it's for a few hours, a weekend, or longer, our professional carers provide temporary cover with the same kindness and consistency as permanent staff. It's a safe, stress-free way to rest and recharge. 
                      
                      Speak with us to arrange short-term or emergency respite care when you need it.`,
                  })
                }
              >
                <ServiceItem icon={serviceRespite} title="Respite Care" />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Home from Hospital care",
                    logo: serviceHomeHosp,
                    description:
                      `Recovering after a hospital stay can be daunting. Our Home-from-Hospital Care helps you transition smoothly back home with daily assistance, medication support, mobility help, and monitoring of recovery routines. 
                      
                      We work closely with hospital discharge teams and families to reduce readmission risks and speed up rehabilitation. 
                      
                      Contact us before discharge to plan your safe return home.`,
                  })
                }
              >
                <ServiceItem
                  icon={serviceHomeHosp}
                  title="Home from Hospital Care"
                />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Specialist care",
                    logo: serviceSpecialist,
                    description:
                      `For individuals living with complex or long-term conditions such as dementia, Parkinson's, MS, stroke recovery, or palliative needs, our Specialist Care offers expert, person-centred support. 
                      
                      Each carer is specially trained and follows a detailed care plan developed with families and health professionals. Our goal is to preserve comfort, dignity, and quality of life every day. 
                      
                      Call us to learn how our experienced carers can support specialist care needs.`,
                  })
                }
              >
                <ServiceItem icon={serviceSpecialist} title="Specialist Care" />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Companionship",
                    logo: serviceCompanion,
                    description:
                      `Loneliness can affect anyone. Our Companionship service provides friendly, engaging carers who visit to chat, share hobbies, accompany you to appointments, or simply offer a reassuring presence. 
                      
                      This service improves mental wellbeing, confidence, and quality of life especially for those living alone. 
                      
                      Reach out today to arrange regular companionship visits.`,
                  })
                }
              >
                <ServiceItem icon={serviceCompanion} title="Companionship" />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Night Care",
                    logo: serviceNightCare,
                    description:
                      `When peace of mind at night matters, our Night Care service ensures safety and comfort around the clock. We offer waking or sleeping night options for assistance with toileting, medication, repositioning, or reassurance during the night. 
                      
                      Families can rest easy knowing a professional carer is on hand if anything is needed. 
                      
                      Call us to arrange flexible overnight support that suits your routine.`,
                  })
                }
              >
                <ServiceItem icon={serviceNightCare} title="Night Care" />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Live-in Care",
                    logo: serviceLiveIn, // <-- add/import an icon for Live-in Care
                    description:
                      `Live-in Care provides full-time, round-the-clock support in the familiarity of your own home. A dedicated carer lives with you, offering personal care, companionship, meal prep, medication reminders, and household help tailored to your unique preferences and schedule. 
                      
                      It's a comforting alternative to residential care, maintaining independence with complete peace of mind. 
                      
                      Talk to us about matching you with a caring live-in professional.`,
                  })
                }
              >
                <ServiceItem icon={serviceLiveIn} title="Live-in Care (24-hour)" />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Medication Administration",
                    logo: serviceMedication,
                    description:
                      `Taking medication correctly is vital but can be confusing especially with multiple prescriptions. Our trained carers manage medication times, doses, and records with precision and care, liaising with pharmacists or GPs if needed. 
                      
                      We ensure you never miss or duplicate doses, keeping you safe and confident in your treatment. 
                      
                      Call us to learn how we can support safe daily medication routines.`,
                  })
                }
              >
                <ServiceItem
                  icon={serviceMedication}
                  title="Medication Administration"
                />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Personal Assistance/Outings",
                    logo: servicePersonalAssistant,
                    description:
                      `Need an extra hand getting out and about? Our Personal Assistance and Outings service helps with errands, appointments, shopping, leisure activities, and social visits. 
                      
                      Whether you want to stay active or simply have company while you're out, we'll make sure you travel safely and enjoyably. 
                      
                      Book your personal assistant today and make every outing stress-free.`,

                  })
                }
              >
                <ServiceItem
                  icon={servicePersonalAssistant}
                  title="Personal Assistance/Outings"
                />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
              <Card.Grid
                style={gridStyle}
                onClick={() =>
                  showDrawer({
                    title: "Autism and LD",
                    logo: serviceLD,
                    description:
                      `Our Autism and Learning-Disability Care provides structured, patient, and individualised support for people of all ages. 
                      
                      We focus on communication, routine, independence, and sensory understanding delivered by carers trained to support neurodiverse individuals with empathy and respect. Families appreciate our flexible, consistent approach that builds trust and confidence. 
                      
                      Contact us to arrange a personalised care plan for autism or learning-disability support.`,
                  })
                }
              >
                <ServiceItem icon={serviceLD} title="Autism and LD" />
                <img src={touchIcon} alt="Touch Icon" className="touch-icon" />
              </Card.Grid>
            </Card>
          </div>
        </div>

        {/* About Us Section */}
        <div id="about">
          <div className="body-wrapper">
            <Divider orientation="left">About Us</Divider>
            <CustomListItems data={aboutUsData} />
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact">
          <div className="body-wrapper">
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
                  title="Phone"
                  size="small"
                  style={{
                    margin: "12px",
                    minHeight: "240px",
                    minWidth: "80%",
                    border: "1px solid #015BBB",
                  }}
                >
                  <p>
                    <PhoneFilled
                      style={{ color: "#015BBB", marginRight: "8px" }}
                    />
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
            <Col xs={24} md={11}>
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
                <p style={{ fontStyle: "italic", marginBottom: "8px" }}>
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
            <Col xs={24} md={5}>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ marginBottom: "16px" }}>Quick Links</h4>
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
                    <a href="#contact">Contact Us</a>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Social Media Section */}
            <Col xs={24} md={8}>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ marginBottom: "16px" }}>Follow Us</h4>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {/* <Tag icon={<TwitterOutlined />} color="#55acee">
                    Twitter
                  </Tag>
                  <Tag icon={<YoutubeOutlined />} color="#cd201f">
                    Youtube
                  </Tag> */}
                  <Tag icon={<FacebookOutlined />} color="#3b5999">
                    Facebook
                  </Tag>
                  <Tag icon={<LinkedinOutlined />} color="#55acee">
                    LinkedIn
                  </Tag>
                  <Tag icon={<InstagramOutlined />} color="#E1306C">
                    Instagram
                  </Tag>
                </div>
                <p>
                  Icons by{" "}
                  <a
                    href="https://icons8.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Icons8
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
