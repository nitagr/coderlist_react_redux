const validationCheck = (
    name: string,
    email: string,
    countryCode: string,
    mobile: string,
    profileImage: string ) => {
        
    let nameFormat = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let mobileFormat = /^\d{10}$/;

    if ( name === '' ) {
        alert('Name: Name required');
    } else if ( name.length<2 ) {
        alert('Name: name should have minimum 2 characters');
    } else if ( name.length>30 ) {
        alert('Name: name should have max of 30 characters');
    } else if ( !nameFormat.test(name) ) {
        alert('Name: Only letters and whitespaces are allowed, may have leading/trailing whitespaces');
    } else if ( email === '' ) {
        alert('Email: Email is required');
    } else if ( !emailFormat.test(email) ) {
        alert('Email: Invalid email');
    } else if ( countryCode === ' ' ) {
        alert('Code: Country code is required');
    } else if ( countryCode !== '+91' ) {
        alert('Code: Invalid country Code, maybe due to leading/trailing whitespaces');
    } else if ( mobile === ' ' ) {
        alert('Mobile: Mobile number is required');
    } else if ( !mobileFormat.test(mobile) ) {
        alert('Mobile: Not a Valid Number, maybe due to leading/trailing whitespaces');
    } else if ( profileImage === '' ) {
        alert('Profile: Upload profile picture');
    } else {
        return true;
    }
    return false;
};

export default validationCheck;