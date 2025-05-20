import React, { useState } from "react";
import { certification } from "../api/api";

const Certification = () => {
    const [userId, setUserId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateCertificate = async () => {
        if (!userId || !courseId) {
            alert("Please fill in both the User ID and Course ID");
            return;
        }

        setLoading(true);

        try {
            // Make the API call to generate the certificate PDF
            const response = await certification(userId,courseId)

            if (!response.ok) {
                throw new Error("Failed to generate certificate");
            }

            // Get the PDF response
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `certificate-${userId}-${courseId}.pdf`;  // You can adjust the naming format
            document.body.appendChild(a);
            a.click();
            a.remove();

        } catch (error) {
            console.error("Error generating certificate:", error);
            alert("There was an error generating the certificate. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Request Your Certificate</h1>
            <div>
                <label htmlFor="userId">User ID:</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your User ID"
                />
            </div>

            <div>
                <label htmlFor="courseId">Course ID:</label>
                <input
                    type="text"
                    id="courseId"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    placeholder="Enter the Course ID"
                />
            </div>

            <button
                onClick={handleGenerateCertificate}
                disabled={loading}
            >
                {loading ? "Generating..." : "Get Certificate"}
            </button>
        </div>
    );
};

export default Certification;
