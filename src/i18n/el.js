const el = {
  site: {
    phoneDisplay: "0203 924 3451",
    phoneDial: "02039243451",
    emails: {
      info: "info@cozycornercare.com",
      corporate: "corporate@cozycornercare.com",
      careers: "careers@cozycornercare.com",
    },
  },
  nav: {
    home: "Αρχική",
    services: "Οι Υπηρεσίες μας",
    about: "Σχετικά με εμάς",
    faq: "Συχνές Ερωτήσεις",
    policy: "Our Policy",
    contact: "Επικοινωνία",
  },
  hero: {
    title: "Συμπονετική Φροντίδα Κατ’ Οίκον που Μπορείτε να Εμπιστευτείτε",
    subtitle:
      "Η Cozy Corner Care είναι εγγεγραμμένος πάροχος φροντίδας κατ’ οίκον στην Care Quality Commission (CQC), παρέχοντας ασφαλή, επαγγελματική και εξατομικευμένη υποστήριξη σε όλο το North London και το Hertfordshire.",
  },
  leadForm: {
    alertMessage:
      "Αφήστε τον αριθμό τηλεφώνου ή το email σας και θα επικοινωνήσουμε μαζί σας σύντομα...",
    placeholder: "Τηλέφωνο ή Email",
  },
  steps: {
    sectionHeading: "Πώς Λειτουργεί η Διαδικασία Φροντίδας μας",
    cardDetailsFallback: "Περισσότερες πληροφορίες...",
    cards: [
      {
        key: "connect",
        step: "Βήμα-1",
        title: "Αρχική Επικοινωνία",
        description:
          "Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας.\n- Σας ακούμε προσεκτικά,\n- Απαντάμε στις ερωτήσεις σας,\n- Συλλέγουμε τις απαραίτητες πληροφορίες,\nώστε να κατανοήσουμε ποια φροντίδα σας ταιριάζει καλύτερα.",
      },
      {
        key: "consultation",
        step: "Βήμα-2",
        title: "Δωρεάν Συμβουλευτική",
        description:
          "Οργανώνουμε μια δωρεάν, χωρίς υποχρέωση, συνάντηση (τηλεφωνική, διαδικτυακή ή δια ζώσης).\n\nΑξιολογούμε τις καθημερινές ανάγκες, τις προτιμήσεις και τη ρουτίνα σας, ώστε να προτείνουμε την κατάλληλη υποστήριξη.",
      },
      {
        key: "review",
        step: "Βήμα-3",
        title: "Αξιολόγηση Πλάνου Φροντίδας",
        description:
          "Σας παρουσιάζουμε ένα εξατομικευμένο πλάνο φροντίδας που περιλαμβάνει υπηρεσίες, πρόγραμμα και επίπεδο υποστήριξης.\n\nΤο πλάνο είναι ευέλικτο και προσαρμόζεται στις ανάγκες σας.",
      },
      {
        key: "care",
        step: "Βήμα-4",
        title: "Έναρξη Φροντίδας",
        description:
          "Μετά την έγκρισή σας, οι φροντιστές μας ξεκινούν την παροχή υποστήριξης.\n\nΣτόχος μας είναι να προσφέρουμε ασφαλή, αξιοπρεπή και συμπονετική φροντίδα, διασφαλίζοντας ανεξαρτησία και ηρεμία.",
      },
    ],
  },
  services: {
    sectionHeading: "Υπηρεσίες Φροντίδας Κατ’ Οίκον",
    dividerTitle: "Οι Υπηρεσίες μας",
    intro:
      "Η επιλογή της κατάλληλης υπηρεσίας φροντίδας είναι σημαντική. Ανακαλύψτε τις υπηρεσίες μας και δείτε πώς μπορούμε να υποστηρίξουμε εσάς ή τους αγαπημένους σας.",
    touchIconAlt: "Εικονίδιο Αφής",
    cards: [
      {
        key: "homecare",
        title: "Φροντίδα στο Σπίτι",
        displayTitle: "Φροντίδα στο Σπίτι (Domiciliary Care)",
        description:
          "Παρέχουμε αξιόπιστη υποστήριξη για καθημερινές ανάγκες, όπως προσωπική υγιεινή, ένδυση, προετοιμασία γευμάτων και κινητικότητα.\n\nΣτόχος μας είναι η διατήρηση της αξιοπρέπειας και της ανεξαρτησίας στο οικείο περιβάλλον σας.",
      },
      {
        key: "respite",
        title: "Ανακουφιστική Φροντίδα",
        displayTitle: "Ανακουφιστική Φροντίδα (Respite Care)",
        description:
          "Προσφέρουμε προσωρινή φροντίδα ώστε οι οικογένειες να μπορούν να ξεκουραστούν, γνωρίζοντας ότι οι αγαπημένοι τους βρίσκονται σε ασφαλή χέρια.",
      },
      {
        key: "hospital",
        title: "Φροντίδα μετά το Νοσοκομείο",
        displayTitle: "Φροντίδα μετά την Εξιτήριο",
        description:
          "Υποστηρίζουμε την ομαλή επιστροφή στο σπίτι μετά από νοσηλεία, μειώνοντας τον κίνδυνο επανεισαγωγής.",
      },
      {
        key: "specialist",
        title: "Εξειδικευμένη Φροντίδα",
        displayTitle: "Εξειδικευμένη Φροντίδα",
        description:
          "Παρέχουμε εξειδικευμένη υποστήριξη για χρόνιες ή σύνθετες παθήσεις όπως άνοια, Πάρκινσον και άλλες.",
      },
      {
        key: "companionship",
        title: "Συντροφιά",
        displayTitle: "Υπηρεσία Συντροφιάς",
        description:
          "Φιλική παρουσία και κοινωνική υποστήριξη για τη βελτίωση της ψυχικής ευεξίας.",
      },
      {
        key: "night",
        title: "Νυχτερινή Φροντίδα",
        displayTitle: "Νυχτερινή Φροντίδα",
        description:
          "Παρέχουμε υποστήριξη κατά τη διάρκεια της νύχτας για ασφάλεια και άνεση.",
      },
      {
        key: "liveIn",
        title: "Μόνιμη Διαμονή Φροντιστή",
        displayTitle: "Φροντίδα με Διαμονή (24 ώρες)",
        description:
          "Συνεχής 24ωρη φροντίδα στο σπίτι με αφοσιωμένο φροντιστή.",
      },
      {
        key: "medication",
        title: "Διαχείριση Φαρμάκων",
        displayTitle: "Διαχείριση Φαρμάκων",
        description:
          "Εξασφαλίζουμε τη σωστή λήψη φαρμάκων με ακρίβεια και ασφάλεια.",
      },
      {
        key: "outings",
        title: "Βοήθεια Εκτός Σπιτιού",
        displayTitle: "Προσωπική Υποστήριξη / Μετακινήσεις",
        description:
          "Υποστήριξη για μετακινήσεις, ψώνια και κοινωνικές δραστηριότητες.",
      },
      {
        key: "autismLd",
        title: "Αυτισμός και Μαθησιακές Δυσκολίες",
        displayTitle: "Αυτισμός και Μαθησιακές Δυσκολίες",
        description:
          "Εξειδικευμένη φροντίδα για άτομα με αυτισμό και μαθησιακές δυσκολίες.",
      },
    ],
  },
  about: {
    sectionHeading: "Σχετικά με την Cozy Corner Care",
    dividerTitle: "Σχετικά με εμάς",
    items: [
      {
        key: "company",
        description:
          "Στην Cozy Corner Care, πιστεύουμε ότι η ποιοτική φροντίδα βασίζεται στη συμπόνια και την επαγγελματική αριστεία.\n\nΗ υπηρεσία μας ιδρύθηκε και διοικείται από έμπειρους νοσηλευτές του NHS και παρέχει εξατομικευμένη φροντίδα με σεβασμό και αξιοπρέπεια.",
      },
      {
        key: "angela",
        title: "Angela Kimani - Υπεύθυνο Πρόσωπο",
        description:
          "Η συμπόνια και η ανθρώπινη προσέγγιση είναι στο επίκεντρο κάθε υπηρεσίας που παρέχουμε.",
      },
      {
        key: "thu",
        title: "Thu Aung - Υπεύθυνος Διαχείρισης",
        description:
          "Η ποιοτική φροντίδα απαιτεί γνώση, συνέπεια και ενσυναίσθηση.",
      },
    ],
  },
  faq: {
    sectionHeading: "Συχνές Ερωτήσεις",
    dividerTitle: "Συχνές Ερωτήσεις",
    items: [
      {
        key: "faq-1",
        label: "Πόσο γρήγορα μπορεί να ξεκινήσει η φροντίδα;",
        children:
          "Στις περισσότερες περιπτώσεις, μπορούμε να ξεκινήσουμε εντός 24 έως 72 ωρών.",
      },
      {
        key: "faq-2",
        label: "Μπορεί να τροποποιηθεί το πλάνο φροντίδας;",
        children:
          "Ναι, τα πλάνα φροντίδας αναθεωρούνται τακτικά και προσαρμόζονται στις ανάγκες σας.",
      },
      {
        key: "faq-3",
        label: "Παρέχετε βραχυπρόθεσμη και μακροπρόθεσμη φροντίδα;",
        children:
          "Ναι, προσφέρουμε τόσο προσωρινή όσο και μακροχρόνια φροντίδα.",
      },
    ],
  },
  contact: {
    sectionHeading: "Επικοινωνήστε με την Cozy Corner Care",
    dividerTitle: "Επικοινωνία",
    addressCardTitle: "Διεύθυνση",
    contactCardTitle: "Στοιχεία Επικοινωνίας",
    addressLines: [
      "Cozy Corner Care Ltd.,",
      "Suite 49,",
      "The Wenta Business Centre,",
      "Innova Business Park,",
      "Electric Ave, Enfield",
      "EN3 7XU",
    ],
    callTitle: "Καλέστε μας",
    callAriaLabel: "Καλέστε την Cozy Corner Care",
  },
  policy: {
    sectionHeading: "Our Policy",
    dividerTitle: "Privacy & Cookies",
    body1:
      "We use essential cookies to keep this website secure and working properly. We do not enable analytics or advertising cookies unless you choose to accept them.",
    body2:
      "You can update your cookie preferences at any time. For privacy requests, please contact us using the details in the Contact Us section.",
  },
  footer: {
    tagline:
      "Αναβαθμίζουμε τη φροντίδα με καινοτομία και ανθρωπιά.",
    copyright: "CCC Design. Με επιφύλαξη παντός δικαιώματος.",
    quickLinksTitle: "Γρήγοροι Σύνδεσμοι",
  },
  drawer: {
    menuTitle: "Μενού",
  },
  social: {
    followUs: "Ακολουθήστε μας",
    facebook: "Facebook",
    linkedIn: "LinkedIn",
    instagram: "Instagram",
  },
  common: {
    callUs: "Καλέστε μας",
    copyEmailAddress: "Αντιγραφή email",
    copyEmailAria: "Αντιγραφή email",
    openMenu: "Άνοιγμα μενού",
    toggleDarkMode: "Εναλλαγή σκοτεινής λειτουργίας",
    logoAlt: "Λογότυπο Cozy Corner Care",
    brandLogoAlt: "Λογότυπο επωνυμίας",
  },
  language: {
    label: "Γλώσσα",
    englishUk: "🇬🇧 Αγγλικά",
    myanmar: "🇲🇲 Βιρμανικά",
    greek: "🇬🇷 Ελληνικά",
    turkish: "🇹🇷 Τουρκικά",
  },
  messages: {
    invalidContact:
      "Μη έγκυρη καταχώρηση. Παρακαλώ εισάγετε έγκυρο email ή αριθμό τηλεφώνου.",
    leadThanks: "Σας ευχαριστούμε! Θα επικοινωνήσουμε σύντομα μαζί σας.",
    leadSendFailed: "Η αποστολή απέτυχε. Παρακαλώ δοκιμάστε ξανά.",
    copiedEmail: "{email} αντιγράφηκε στο πρόχειρο!",
    copyEmailFailed: "Η αντιγραφή απέτυχε.",
  },
  forms: {
    leadMessage: "Αίτημα επικοινωνίας από την ιστοσελίδα Cozy Corner Care",
    leadSubject: "CCC Website: αίτημα επικοινωνίας",
    leadSource: "homepage-hero",
  },
  cookieBanner: {
    body:
      "Χρησιμοποιούμε απαραίτητα cookies για τη λειτουργία της ιστοσελίδας. Δεν χρησιμοποιούμε cookies ανάλυσης ή διαφήμισης χωρίς τη συγκατάθεσή σας.",
    privacyLabel: "Πολιτική Απορρήτου & Cookies",
    reject: "Απόρριψη",
    acceptAll: "Αποδοχή όλων",
  },
};

export default el;
