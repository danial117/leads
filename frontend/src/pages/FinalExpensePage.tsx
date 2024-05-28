import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBox from '../components/LoadingBox'
import { Store } from '../Store'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import { finalExpenseDataMutation } from '../hooks/leadHook'

export default function FinalExpense() {
  const navigate = useNavigate()
  const { search } = useLocation()

 
 
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipcode: '',
    leadID:''
  });

  const [token,setToken]=useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };



 
  const validateForm = () => {
    const newErrors = {};
    // Name validation
    if (formData.name.length < 3) {
      newErrors.name = 'Name should be at least 3 characters long.';
    }
    if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should contain only numeric characters.';
    }
    // Email validation
    if (!formData.email.endsWith('@gmail.com')) {
      newErrors.email = 'Email should end with @gmail.com.';
    }
    // Zip code validation (simple US zip code validation)
    if (!/^\d{5}(-\d{4})?$/.test(formData.zipcode)) {
      newErrors.zipcode = 'Zip code should be at least 5 digits long and can optionally have a hyphen followed by 4 digits.';
    }
    return newErrors;
  };
 







  useEffect(() => {
    // This effect will run once when the component mounts
    const insertToken = (token) => {
      // Get the form element
     

     setToken(token)
        // Get the element with id 'leadid_token'
        let tokenElement = document.getElementById('leadid_token');

        fetch(`http://localhost:4000/api/leads/leadID/${token}`,{
          method:'GET'
        }).then((response)=>response.json()).then((result)=>{console.log(result)})
        


      



        // If the element does not exist, create it
       
  
        // Set the value of the element to the token
      
        setFormData((prevFormData) => ({
          ...prevFormData,
          leadID: token,
        }));
        console.log('Token set:', token);

        if (!tokenElement) {
          tokenElement = document.createElement('input');
          tokenElement.type = 'hidden';
          tokenElement.id = 'leadid_token';
          tokenElement.name = 'leadid_token';
          signupForm.appendChild(tokenElement);
        }
        tokenElement.value = token;
        
     
    };

    // Expose insertToken globally
    window.insertToken = insertToken;

    // Append the external script
    const script = document.createElement('script');
    script.id = 'LeadiDscript_campaign';
    script.type = 'text/javascript';
    script.async = true;
    const timestamp = new Date().getTime();
    script.src = `https://create.lidstatic.com/campaign/d59a0d85-facd-f7ff-54d9-8f8ab6d69fbf.js?snippet_version=2&_t=${timestamp}&callback=insertToken&f=reset`;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      const script = document.getElementById('LeadiDscript_campaign');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);


  
  



  const [showMore, setShowMore] = useState(false)

  
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signin, isLoading } = finalExpenseDataMutation()

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {

      const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);


      if(token){
        
      const data = await signin(formData); 
      localStorage.setItem('userData', JSON.stringify(data));
      
      

      if(data){
        setFormData({
          name: '',
          email: '',
          phone: '',
          zipcode: '',
          leadID:''
        });
      }

     
      const script = document.getElementById('LeadiDscript_campaign');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }

      // localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.href = '/';
    }
    } catch (err) {
      toast.error(getError(err));
    } finally {
      
    }
  };





 

  return (



        <Container className="small-container">
      <Helmet>

        <title> Final Expense</title>
      </Helmet>
      <h1 className="my-3"> Final Expense</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
         <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
         <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone No</Form.Label>
        <Form.Control
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          isInvalid={!!errors.phone}
        />
         <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="zipcode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="text"
          required
          value={formData.zipcode}
          onChange={handleChange}
          isInvalid={!!errors.zipcode}
        />
         <Form.Control.Feedback type="invalid">
            {errors.zipcode}
          </Form.Control.Feedback>
      </Form.Group>
      <label style={{display:'none'}}>
  <input style={{display:'none'}} id="leadid_tcpa_disclosure"  type="checkbox" />
  <span style={{display:'none'}} className={`wpcf769-list-item-label`}>
  BY CLICKING GET QUOTE, I AGREE TO THE TERMS OF SERVICE AND PRIVACY POLICY AND AUTHORIZE AUTO INSURANCE COMPANIES THEIR AGENTS AND MARKETING PARTNERS TO CONTACT ME ABOUT AUTO INSURANCE AND OTHER NON-INSURANCE OFFERS BY TELEPHONE CALLS AND TEXT MESSAGES TO THE NUMBER I PROVIDED ABOVE.
   I AGREE TO RECEIVE TELEMARKETING CALLS AND PRE-RECORDED MESSAGES VIA AN AUTODIALED PHONE SYSTEM, EVEN IF MY TELEPHONE NUMBER IS A MOBILE NUMBER THAT IS CURRENTLY LISTED ON ANY STATE, FEDERAL OR CORPORATE “DO NOT CALL” LIST.
    I UNDERSTAND THAT I MAY REVOKE MY CONSENT AT ANY TIME AND THAT MY CONSENT IS NOT A CONDITION OF PURCHASE OF ANY GOODS OR SERVICES AND THAT STANDARD MESSAGE AND DATA RATES MAY APPLY FOR CALIFORNIA RESIDENTS
       
      
    </span>
</label>


 <label>
  <input type="checkbox"  value="BY CLICKING GET QUOTE, I AGREE TO THE TERMS OF SERVICE AND PRIVACY POLICY AND AUTHORIZE AUTO INSURANCE COMPANIES THEIR AGENTS AND MARKETING PARTNERS TO CONTACT ME ABOUT AUTO INSURANCE AND OTHER NON-INSURANCE OFFERS BY TELEPHONE CALLS AND TEXT MESSAGES TO THE NUMBER I PROVIDED ABOVE. I AGREE TO RECEIVE TELEMARKETING CALLS AND PRE-RECORDED MESSAGES VIA AN AUTODIALED PHONE SYSTEM, EVEN IF MY TELEPHONE NUMBER IS A MOBILE NUMBER THAT IS CURRENTLY LISTED ON ANY STATE, FEDERAL OR CORPORATE “DO NOT CALL” LIST. I UNDERSTAND THAT I MAY REVOKE MY CONSENT AT ANY TIME AND THAT MY CONSENT IS NOT A CONDITION OF PURCHASE OF ANY GOODS OR SERVICES AND THAT STANDARD MESSAGE AND DATA RATES MAY APPLY FOR CALIFORNIA RESIDENTS"/>
  <span className={`wpcf769-list-item-label text-xs`}>
      By Checking this box, you represent that you are 18+ years {!showMore &&   <a onClick={()=>{setShowMore(!showMore)}} style={{cursor:'pointer',color:'blue',fontSize:'15px'}}>See More </a>} {showMore && (
        <>
            of age and agree to the
          <a href="https://lifeasehealth.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and 
          <a href="https://lifeasehealth.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>. 
          By selecting the above check box "you agree by your electronic signature that you give express written consent to receive 
          marketing communications regarding Insurance and services by automatic dialing system and pre-recorded calls and artificial 
          voice messages from lifeasehealth.com and one or more of its 
          <a href="https://lifeasehealth.com/marketing-partners/" target="_blank" rel="noopener noreferrer">marketing partners</a> 
          at the phone number and e-mail address provided by you, including wireless numbers, if applicable, even if you have 
          previously registered the provided number on the Do Not Call Registry. SMS/MMS and data messaging rates may apply.” Your 
          consent is not required to get a quote or purchase. Your consent can be revoked at any time for any reason. To receive 
          quotes without providing consent, please call at (TTY 711) (888) 431-1104. Carrier data rates may apply. TCPA LeadID's are 
          used with the information for compliance. This is a solicitation&nbsp;for&nbsp;insurance.'{showMore && <a onClick={()=>{setShowMore(!showMore)}} style={{cursor:'pointer',color:'blue',fontSize:'15px'}}>Show less</a>}
        </>
      )}
    </span>
</label>


<div>
          
          </div>
        

      <div className="mb-3">
     
        <Button disabled={isLoading} type="submit">
          Get Your Medicare Quote
        </Button>
        {isLoading && <LoadingBox />}
      </div>
    </Form>

       </Container>
      
     
      
     


     


    
      
      


   
  )
}