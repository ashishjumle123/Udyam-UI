document.addEventListener('DOMContentLoaded', function() {
    const step1Form = document.getElementById('form-step-1');
    const step2Form = document.getElementById('form-step-2');

    const step1Div = document.getElementById('step-1');
    const step2Div = document.getElementById('step-2');
    const successDiv = document.getElementById('step-success');

    const aadhaarInput = document.getElementById('aadhaar');
    const panInput = document.getElementById('pan');

    const aadhaarError = document.getElementById('aadhaar-error');
    const panError = document.getElementById('pan-error');
    
    const step1Indicator = document.getElementById('step-1-indicator');
    const step2Indicator = document.getElementById('step-2-indicator');
    const progressLine = document.getElementById('progress-line');

    const submittedDataContainer = document.getElementById('submitted-data');

    let formData = {};

    // --- VALIDATION LOGIC ---
    function validateAadhaar() {
        const aadhaarRegex = /^\d{12}$/;
        if (aadhaarRegex.test(aadhaarInput.value)) {
            aadhaarError.style.display = 'none';
            return true;
        } else {
            aadhaarError.style.display = 'block';
            return false;
        }
    }

    function validatePAN() {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
        if (panRegex.test(panInput.value)) {
            panError.style.display = 'none';
            return true;
        } else {
            panError.style.display = 'block';
            return false;
        }
    }

    aadhaarInput.addEventListener('input', validateAadhaar);
    panInput.addEventListener('input', validatePAN);

    // --- FORM SUBMISSION HANDLING ---
    step1Form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateAadhaar()) {
            const step1Data = new FormData(step1Form);
            for (let [key, value] of step1Data.entries()) {
                formData[key] = value;
            }

            // Simulate OTP validation and move to next step
            step1Div.classList.remove('active');
            step2Div.classList.add('active');
            
            step2Indicator.classList.add('active');
            progressLine.classList.add('step2');
        }
    });

    step2Form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validatePAN()) {
            const step2Data = new FormData(step2Form);
            for (let [key, value] of step2Data.entries()) {
                formData[key] = value;
            }
            
            // --- MOCK BACKEND SUBMISSION ---
            console.log('Submitting the following data to the backend:', formData);
            
            mockApiSubmit(formData)
                .then(response => {
                    console.log('Backend response:', response);
                    // Show success message on the UI
                    step2Div.classList.remove('active');
                    successDiv.classList.add('active');
                    submittedDataContainer.textContent = JSON.stringify(response.data, null, 2);
                })
                .catch(error => {
                    console.error('Submission failed:', error);
                    alert(`Error: ${error.message}`);
                });
        }
    });

    // --- MOCK API FUNCTION ---
    function mockApiSubmit(data) {
        console.log("Simulating API call...");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!data.panNumber || !data.aadhaarNumber) {
                    reject({
                        status: 400,
                        message: "Bad Request: Missing required fields."
                    });
                } else {
                    resolve({
                        status: 201,
                        message: "Application created successfully.",
                        data: data 
                    });
                }
            }, 1000);
        });
    }
});
