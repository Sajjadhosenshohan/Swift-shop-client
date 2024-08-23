const backendDomain = "http://localhost:8000";

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "POST",
        headers: {
            "content-type": "application/json"
        }
    }
}

export default SummaryApi;