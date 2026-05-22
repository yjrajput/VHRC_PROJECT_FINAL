import { useContext, createContext, useState } from "react";



export const ContexData = createContext();




const Contex = ({ children }) => {
  const[selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const[contactForm, setContactForm] = useState({
     name: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    message: '',
    preferredContact: 'email'
  })

    const onBookAppointment = () => {
        setShowAppointmentForm(true)
    }


     const handlePhoneClick = () => {
    console.log('Phone call initiated');
    window.open('tel:9926009520', '_self');
  };

  const handleEmailClick = () => {
    console.log('Email clicked');
    window.open('vijaylaxmihospital.kgn@gmail.com', '_self');
  };

  const handleEmergencyCall = () => {
    console.log('Emergency call initiated');
    window.open('tel:7688009300', '_self');
  };

  const handleDirections = () => {
    console.log('Directions clicked');
    window.open('https://maps.app.goo.gl/8MJW7V9q9mFCQFZPA')
  };

  const handleLiveChat = () => {
    console.log('Live chat clicked');
  };


  const handleContactClick = (method, value) => {
  console.log(`Contact method clicked: ${method} - ${value}`);

  if (method === 'phone') {
    window.open(`tel:${value.replace(/[^\d]/g, '')}`, '_self');
  } else if (method === 'email') {
    window.open(`mailto:${value}`, '_self');
  } else if (method === 'chat') {
    console.log('Starting live chat...');
  }
};




const handelContactFormSubmit = (event) =>{
  event.preventDefault();
  
  console.log(contactForm)
}
  
  

    return (
        <ContexData.Provider value={{
            onBookAppointment,
            handlePhoneClick,
            handleEmailClick,
            handleEmergencyCall,
            handleDirections,
            handleLiveChat,
            selectedDepartment,
            setSelectedDepartment,
            searchTerm,
            setSearchTerm,
            handleContactClick,
            handelContactFormSubmit,
            contactForm,
            setContactForm,
            setShowAppointmentForm,
            showAppointmentForm

            
        }}>
            {children}
        </ContexData.Provider>
    )
}

export default Contex;


export const UseCustomContext = () => {
    const data = useContext(ContexData);
    return data;
}