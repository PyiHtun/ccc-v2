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
import CoverageMap from "./component/CoverageMap.jsx";
import DeferredPolicy from "./component/DeferredPolicy.jsx";
import useWindowSize from "./hook/useWindowSize";
import { useI18n } from "./i18n/useI18n.js";

import { services as servicePages } from "./seo/services.js";

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
import { message, Alert, Layout, Col, Row, Input, Collapse, Divider, Typography, Card, ConfigProvider, theme as antdTheme, Form, Select, DatePicker, Checkbox, Button, Radio } from "antd";
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
  const { t } = useI18n();
  const [searchValue, setSearchValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const searchRef = useRef(null);
  const { width } = useWindowSize();
  const [sending, setSending] = useState(false);
  const [contactForm] = Form.useForm();
  const [contactSending, setContactSending] = useState(false);
  const careStartValue = Form.useWatch("careStart", contactForm);

  useEffect(() => {
    if (careStartValue === "asap") {
      contactForm.setFieldValue("expectedStartDate", null);
    }
  }, [careStartValue, contactForm]);

  const menuItems = [
    { key: "home", label: <a href="#home">{t("nav.home")}</a> },
    { key: "services", label: <a href="#services">{t("nav.services")}</a> },
    { key: "areas", label: <a href="#areas">{t("areas.title")}</a> },
    { key: "about", label: <a href="#about">{t("nav.about")}</a> },
    { key: "faq", label: <a href="#faq">{t("nav.faq")}</a> },
    { key: "policy", label: <a href="#policy">{t("nav.policy")}</a> },
    { key: "contact", label: <a href="#contact">{t("nav.contact")}</a> },
  ];

  const serviceLogoMap = {
    homecare: serviceHomeCare,
    respite: serviceRespite,
    hospital: serviceHomeHosp,
    specialist: serviceSpecialist,
    companionship: serviceCompanion,
    night: serviceNightCare,
    liveIn: serviceLiveIn,
    medication: serviceMedication,
    outings: servicePersonalAssistant,
    autismLd: serviceLD,
  };
  const stepImageMap = {
    connect: card1,
    consultation: card2,
    review: card3,
    care: card4,
  };
  const aboutAvatarMap = {
    company: cccAvatar,
    angela: angelaAvatar,
    thu: thuAvatar,
  };

  const serviceCards = (t("services.cards", []) || []).map((card) => ({
    ...card,
    logo: serviceLogoMap[card.key],
  }));
  const stepCards = (t("steps.cards", []) || []).map((card) => ({
    ...card,
    imageSrc: stepImageMap[card.key],
  }));
  const faqItems = t("faq.items", []) || [];
  useEffect(() => {
    let frame;
    const scrollToContactForm = () => {
      if (window.location.hash !== "#contact-form") return;
      cancelAnimationFrame(frame);
      // The form anchor only exists after React replaces the initial HTML.
      frame = requestAnimationFrame(() => {
        document.getElementById("contact-form")?.scrollIntoView({ block: "start", behavior: "auto" });
      });
    };
    scrollToContactForm();
    window.addEventListener("hashchange", scrollToContactForm);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToContactForm);
    };
  }, []);

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

    if (host.querySelector('script[data-cqc-widget="true"]')) return;

    host.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.setAttribute("data-cqc-widget", "true");
    script.src =
      "https://www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js" +
      "?data-id=1-26179879651&data-host=www.cqc.org.uk&type=location";

    host.appendChild(script);

    return () => {
      host.innerHTML = "";
    };
}, []);
  
  const aboutUsData = (t("about.items", []) || []).map((item) => ({
    ...item,
    avatar: aboutAvatarMap[item.key],
  }));

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
    message.error(t("messages.invalidContact"));
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
    formData.append("message", t("forms.leadMessage"));
    formData.append("_subject", t("forms.leadSubject"));
    formData.append("source", t("forms.leadSource")); // or any page/section

    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (!res.ok) throw new Error("Network error");

    message.success(t("messages.leadThanks"));
    setSuccessful(true);
    setSearchValue("");
    searchRef.current?.blur();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    console.error(err);
    message.error(t("messages.leadSendFailed"));
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

  const showServiceDrawer = (service) => showDrawer({
    title: service.title,
    logo: service.logo,
    description: service.description,
  });

  const onClose = () => setDrawerOpen(false);

  const handleCopyEmail = (email) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        message.success(t("messages.copiedEmail").replace("{email}", email));
      })
      .catch(() => {
        message.error(t("messages.copyEmailFailed"));
      });
  };

  const handleContactSubmit = async (values) => {
    setContactSending(true);
    try {
      const formData = new FormData();
      formData.append("full_name", values.fullName?.trim() || "");
      formData.append("phone", values.phone?.trim() || "");
      formData.append("email", values.email?.trim() || "");
      formData.append("care_postcode", values.postcode?.trim() || "");
      formData.append("care_start_timeframe", values.careStart || "");
      formData.append(
        "expected_start_date",
        values.expectedStartDate ? values.expectedStartDate.format("YYYY-MM-DD") : ""
      );
      formData.append("promo_code", values.promoCode?.trim() || "");
      formData.append("help_message", values.helpMessage?.trim() || "");
      formData.append("consent", values.consent ? "Yes" : "No");
      formData.append("page", window.location.href);
      formData.append("_gotcha", "");
      formData.append("_subject", t("forms.contactSubject"));
      formData.append("source", t("forms.contactSource"));

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!res.ok) throw new Error("Network error");

      message.success(t("messages.contactFormThanks"));
      contactForm.resetFields();
    } catch (err) {
      console.error(err);
      message.error(t("messages.contactFormSendFailed"));
    } finally {
      setContactSending(false);
    }
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
                {t("hero.title")}
              </Title>

              <Paragraph className="hero-subtitle">
                {t("hero.subtitle")}
              </Paragraph>
            </Typography>
          </div> 
          <FloatButtonWrapper />
        </section>

        {/* Search Section */}
        <Row justify="center" align="center">
          <Col span={19} style={{ textAlign: "center" }}>
            <Alert
              message={t("leadForm.alertMessage")}
              description={
                <Search
                  ref={searchRef}
                  className="custom-search"
                  placeholder={t("leadForm.placeholder")}
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
          <h2 className="seo-heading">{t("steps.sectionHeading")}</h2>
          <div className="card-container">
            <Row gutter={32} className="card-row">
              {stepCards.map((step) => (
                <Col span={6} key={step.key}>
                  <StepCard
                    step={step.step}
                    title={step.title}
                    imageSrc={step.imageSrc}
                    onClick={() =>
                      showDrawer({
                        title: step.title,
                        image: step.imageSrc,
                        description: step.description,
                      })
                    }
                  />
                </Col>
              ))}
            </Row>

            {/* Drawer for Card Details */}
            <TapSwipeDrawer
              title={selectedCard ? selectedCard.title : t("steps.cardDetailsFallback")}
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
                t("steps.cardDetailsFallback")
              )}
            </TapSwipeDrawer>
          </div>
        </div>

        {/* Services Section */}
        <div id="services">
          <div className="body-wrapper">
            <h2 className="seo-heading">{t("services.sectionHeading")}</h2>
            <Divider orientation="left" className="divider">
              {t("services.dividerTitle")}
            </Divider>
            <CustomListItems
              avatar={cccAvatar}
              description={t("services.intro")}
            />
            <Card>
              {serviceCards.map((service) => (
                <Card.Grid
                  key={service.title}
                  style={gridStyle}
                  className="service-card-grid"
                  hoverable={false}
                  role="button"
                  tabIndex={0}
                  aria-label={service.displayTitle}
                  onClick={() => showServiceDrawer(service)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      showServiceDrawer(service);
                    }
                  }}
                >
                  <ServiceItem icon={service.logo} title={service.displayTitle} />
                  <img src={touchIcon} alt={t("services.touchIconAlt")} className="touch-icon" />
                </Card.Grid>
              ))}
            </Card>
            <nav className="service-page-links" aria-label={t("services.pageLinksLabel")}>
              {servicePages.map((service) => (
                <a key={service.slug} href={`/services/${service.slug}/`}>
                  {t(`services.pageTitles.${service.slug}`, service.displayTitle)}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <section id="areas" className="body-wrapper">
          <h2 className="seo-heading">{t("areas.title")}</h2>
          <Divider orientation="left">{t("areas.title")}</Divider>
          <CustomListItems description={t("areas.description")} />
          <div className="coverage-content">
            <CoverageMap darkMode={darkMode} />
            <div className="coverage-actions">
              <a href="#contact-form">{t("areas.contactLink")}</a>
              <a href={`tel:${t("site.phoneDial")}`}>{t("common.callUs")}: {t("site.phoneDisplay")}</a>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <div id="about">
          <div className="body-wrapper">
            <h2 className="seo-heading">{t("about.sectionHeading")}</h2>
            <Divider orientation="left">{t("about.dividerTitle")}</Divider>
            <CustomListItems data={aboutUsData} />
          </div>
        </div>
        <div id="faq">
          <div className="body-wrapper">
            <h2 className="seo-heading">{t("faq.sectionHeading")}</h2>
            <Divider orientation="left">{t("faq.dividerTitle")}</Divider>
            <div className="section-collapse-wrap">
              <Collapse accordion items={faqItems} />
            </div>
          </div>
        </div>

        {/* Policy Section */}
        <div id="policy">
          <DeferredPolicy />
        </div>

        {/* Contact Section */}
        <div id="contact">
          <div className="body-wrapper">
            <h2 className="seo-heading">{t("contact.sectionHeading")}</h2>
            <Divider orientation="left" className="divider">
              {t("contact.dividerTitle")}
            </Divider>
            <Row
              gutter={16}
              className="card-row"
              style={{ textAlign: "center" }}
            >
              <Col span={12}>
                <Card
                  title={t("contact.addressCardTitle")}
                  size="small"
                  style={{
                    margin: "12px",
                    minHeight: "240px",
                    minWidth: "80%",
                    border: "1px solid #015BBB",
                  }}
                >
                  <p>
                    {(t("contact.addressLines", []) || []).map((line) => (
                      <React.Fragment key={line}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title={t("contact.contactCardTitle")}
                  size="small"
                  style={{
                    margin: "12px",
                    minHeight: "240px",
                    minWidth: "80%",
                    border: "1px solid #015BBB",
                  }}
                >
                 <p
                    onClick={() => (window.location.href = `tel:${t("site.phoneDial")}`)}
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
                      (window.location.href = `tel:${t("site.phoneDial")}`)
                    }
                    title={t("contact.callTitle")}
                    aria-label={t("contact.callAriaLabel")}
                  >
                    <PhoneFilled style={{ color: "#015BBB", marginRight: 8 }} />
                    {t("site.phoneDisplay")}
                  </p>
                  <p onClick={() => handleCopyEmail(t("site.emails.info"))}>
                    <MailFilled
                      style={{ color: "#015BBB", marginRight: "8px" }}
                    />
                    {t("site.emails.info")}
                  </p>
                  <p onClick={() => handleCopyEmail(t("site.emails.corporate"))}>
                    <MailFilled
                      style={{ color: "#015BBB", marginRight: "8px" }}
                    />
                    {t("site.emails.corporate")}
                  </p>
                  <p onClick={() => handleCopyEmail(t("site.emails.careers"))}>
                    <MailFilled
                      style={{ color: "#015BBB", marginRight: "8px" }}
                    />
                    {t("site.emails.careers")}
                  </p>
                </Card>
              </Col>
            </Row>

            <Card id="contact-form" className="contact-form-card" style={{ margin: "12px", border: "1px solid #015BBB" }}>
              <Form
                form={contactForm}
                layout="vertical"
                className="care-contact-form"
                onFinish={handleContactSubmit}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("contact.form.fullNameLabel")}
                      name="fullName"
                      rules={[{ required: true, message: t("contact.form.fullNameRequired") }]}
                    >
                      <Input placeholder={t("contact.form.fullNamePlaceholder")} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("contact.form.phoneLabel")}
                      name="phone"
                      rules={[{ required: true, message: t("contact.form.phoneRequired") }]}
                    >
                      <Input placeholder={t("contact.form.phonePlaceholder")} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={t("contact.form.emailLabel")}
                      name="email"
                      rules={[{ type: "email", message: t("contact.form.emailInvalid") }]}
                    >
                      <Input placeholder={t("contact.form.emailPlaceholder")} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label={t("contact.form.promoLabel")} name="promoCode">
                      <Input placeholder={t("contact.form.promoPlaceholder")} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item label={t("contact.form.postcodeLabel")} name="postcode">
                      <Input placeholder={t("contact.form.postcodePlaceholder")} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label={t("contact.form.careStartLabel")}>
                      <div className="care-start-inline-row">
                        <Form.Item name="careStart" initialValue="asap" noStyle>
                          <Radio.Group optionType="button" buttonStyle="solid">
                            <Radio.Button value="asap">{t("contact.form.careStartAsap")}</Radio.Button>
                            <Radio.Button value="specific-date">{t("contact.form.careStartSpecific")}</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item name="expectedStartDate" noStyle>
                          <DatePicker
                            style={{ width: "100%" }}
                            format="DD-MMM-YYYY"
                            disabled={careStartValue !== "specific-date"}
                            placeholder={t("contact.form.expectedDateLabel")}
                          />
                        </Form.Item>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label={t("contact.form.helpLabel")} name="helpMessage">
                  <Input.TextArea rows={4} placeholder={t("contact.form.helpPlaceholder")} />
                </Form.Item>

                <Form.Item
                  name="consent"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error(t("contact.form.consentRequired"))),
                    },
                  ]}
                >
                  <Checkbox>
                    {t("contact.form.consentText")}
                  </Checkbox>
                </Form.Item>

                <div className="contact-form-actions">
                  <Button type="primary" htmlType="submit" loading={contactSending}>
                    {t("contact.form.submit")}
                  </Button>
                </div>
              </Form>

              <p className="careers-note">
                {t("contact.form.careersNotePrefix")} <a href="mailto:careers@cozycornercare.com">careers@cozycornercare.com</a>.
              </p>
            </Card>

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
                  alt={t("common.brandLogoAlt")}
                  style={{
                    width: "200px",
                    marginBottom: "2px",
                    marginTop: "10px",
                  }}
                />
                <p style={{ fontStyle: "italic", marginBottom: "8px", marginTop: "8px" }}>
                  {t("footer.tagline")}
                </p>
                <p>
                  © {new Date().getFullYear()} {t("footer.copyright")}
                </p>
              </div>
            </Col>

            {/* Quick Links Section */}
            <Col xs={24} md={4}>
              <div style={{ textAlign: "left" }}>
                <h4 style={{  marginTop: "12px", marginBottom: "16px" }}>{t("footer.quickLinksTitle")}</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#home">{t("nav.home")}</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#services">{t("nav.services")}</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#areas">{t("areas.title")}</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#about">{t("nav.about")}</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#faq">{t("nav.faq")}</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#policy">{t("nav.policy")}</a>
                  </li>
                  <li style={{ marginBottom: "8px" }}>
                    <a href="#contact">{t("nav.contact")}</a>
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
