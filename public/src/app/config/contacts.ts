import {Contact} from  '../Components/contacts/contact';
let MockContact1: Contact = <Contact>{_id:'1', first_name: "Rollins", last_name: "Welch", email: "rollinswelch@rodemco.com", phone: '8814262334'};
let MockContact2: Contact = <Contact>{_id:'2', first_name: "Debora", last_name: "Hickman", email: "deborahickman@rodemco.com", phone: '8825852704'};
let MockContact3: Contact = <Contact>{_id:'3', first_name: "Holder", last_name: "Weiss", email: "holderweiss@rodemco.com", phone: '8525793341'};
let MockContact4: Contact = <Contact>{_id:'4', first_name: "Hensley", last_name: "Eaton", email: "hensleyeaton@rodemco.com", phone: '9274802669'};
let MockContact5: Contact = <Contact>{_id:'5', first_name: "Dyer", last_name: "Walker", email: "dyerwalker@rodemco.com", phone: '8355193621'};

let MockContactesArray: Array<Contact> = [ MockContact1, MockContact2, MockContact3, MockContact4, MockContact5 ];
export  default {
  contacts : MockContactesArray
};
