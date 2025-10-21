function validateForm() {
  const companyName = document.getElementById("companyName").value;
  const contactDetails = document.getElementById("contactDetails").value;
  const emailAddress = document.getElementById("emailAddress").value;

  if (!companyName) {
    alert("Please enter company name");
    return false;
  }

  if (!contactDetails) {
    alert("Please enter contact details");
    return false;
  }

  if (!emailAddress) {
    alert("Please enter email address");
    return false;
  }

  alert("Form submitted successfully!");
  return true;
}
