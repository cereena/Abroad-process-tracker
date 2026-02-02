import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentProfile from "../student/StudentProfile";
import API from "../../services/studentApi";

export default function StudentProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        console.log("FULL PROFILE FROM API 👉", profile);
    }, [profile]);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get("/student/profile");

                const data = res.data;

                setProfile({
                    ...data,

                    // 👇 ENSURE ALL PHASES EXIST
                    academicInfo: data.academicInfo || {},
                    workExperience: data.workExperience || {},
                    preferences: data.preferences || {},
                    sponsorship: data.sponsorship || {},
                });

            } catch (err) {
                console.error("Profile fetch error", err);
            }
        };

        fetchProfile();
    }, []);


    return (
        <StudentProfile
            profile={profile}
            onEdit={() => navigate("/student/my-profile")}
        />
    );
}
