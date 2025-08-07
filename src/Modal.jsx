import React, {useState, useEffect, useRef} from 'react';
import './Modal.css';


function Modal(){
    const[isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);
    const [formData, setFormData] = useState({
        username: '', email: '', phone: '', dob: ''
    });

    useEffect(() => {
        const handleClick = (event) => {
            if(modalRef.current && !modalRef.current.contains(event.target)){
                setIsModalOpen(false);
            }
        };
        if(isModalOpen){
            document.addEventListener('mousedown', handleClick);
        }
        else{
            document.removeEventListener('mousedown', handleClick);
        }
        return() => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [isModalOpen]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    const handleSubmit =(e) => {
        e.preventDefault();
        const { username, email, phone, dob } = formData;
        if(!username || !email || !phone || !dob){
            alert('Please Fill out all the Fields.');
            return;
        }
        if(!email.includes('@')){
            alert('Invalid email. Please check your email address.');
            return;
        }
        if(!/^\d{10}$/.test(phone)){
            alert('Invalid phone number. Please enter a 10-digit phone number.');
            return;
        }
        const selectedDate = new Date(dob);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
            alert('Invalid date of birth. Please select a valid date.');
            return;
        }
         setIsModalOpen(false);
         setFormData({ username: '', email: '', phone: '', dob: '' });
    };


    return(
        <div>
            <h1>User Details Modal</h1>
            <div className="modal">
              {!isModalOpen && (
                <button onClick={() => setIsModalOpen(true)}>Open Form</button>
              )}

            {isModalOpen && (
            <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                    type="date"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
            </div>
            )}
        </div>
        </div>
    );
}
export default Modal;