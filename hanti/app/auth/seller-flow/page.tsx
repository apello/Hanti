"use client";

import { ReactNode, useEffect, useState } from "react";

// TODO: Make standard home profile type instead of generic Record
// type userProfile = {
//     address: string;
//     movingDetails: string;
// }

const QuestionaireFlow = ({ children }: { children: ReactNode[] }) => {
    const [count, setCount] = useState(1);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); 
        const saved = localStorage.getItem("questionaire-step");
        if (saved) setCount(Number(saved));
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("questionaire-step", String(count));
        }
    }, [count, isMounted]);

    const decrementCount = () => setCount((c) => Math.max(1, c - 1));
    const incrementCount = () => setCount((c) => Math.min(children.length, c + 1));

    if (!isMounted) {
        return <div>Loading...</div>;
    }
    
    return (
    <div>
        <div>{children[count - 1]}</div>
        <div style={{ display: "flex", gap: 8 }}>
        Step {count} / {children.length}
        {count > 1 && <button onClick={decrementCount}>Back</button>}
        {count < children.length && <button onClick={incrementCount}>Next</button>}
        </div>
    </div>
    );
};

const HomeAddress = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: Record<string, string>;
  setUserProfile: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  return (
    <div>
      <h1>Tell us about your home:</h1>
      <h3>First, enter the address of the home:</h3>
      <input
        type="text"
        value={userProfile.homeAddress || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, homeAddress: e.target.value }))
        }
      />
    </div>
  );
};

const MovingDetails = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: Record<string, string>;
  setUserProfile: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  return (
    <div>
      <h1>Before we get started, do any of these apply to you?</h1>
      <h3>
        We may be required to share your selling options with your agent if an
        agreement has been signed.
      </h3>
      <input
        type="text"
        value={userProfile.movingDetails || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, movingDetails: e.target.value }))
        }
      />
    </div>
  );
};

const Email = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: Record<string, string>;
  setUserProfile: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  return (
    <div>
      <h1>What's your email?</h1>
      <h3>Sign in or create an account to view your selling options:</h3>

      <label>Email</label>
      <input
        type="text"
        value={userProfile.sellerEmail || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, sellerEmail: e.target.value }))
        }
      />
    </div>
  );
};

const FullName = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: Record<string, string>;
  setUserProfile: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  return (
    <div>
      <h1>What's your name?</h1>

      <label>First Name</label>
      <input
        type="text"
        value={userProfile.firstName || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, firstName: e.target.value }))
        }
      /> 

      <br/>

      <label>Last Name</label>
      <input
        type="text"
        value={userProfile.lastName || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, lastName: e.target.value }))
        }
      />
    </div>
  );
};


const PhoneNumber = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: Record<string, string>;
  setUserProfile: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  return (
    <div>
      <h1>What's your name?</h1>
      <h3>We'll send you a text so you can get help when you're ready.</h3>

      <label>Phone</label>
      <input
        type="text"
        value={userProfile.phoneNumber || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, phoneNumber: e.target.value }))
        }
      />
    </div>
  );
};



export default function SellerFlow() {
  const [userProfile, setUserProfile] = useState<Record<string, string>>({});

  // Load saved userProfile on mount
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setUserProfile(JSON.parse(saved));
  }, []);

  // Save userProfile on change
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  return (
    <div>
      <h1>Seller flow</h1>
      <QuestionaireFlow>
        <HomeAddress userProfile={userProfile} setUserProfile={setUserProfile} />
        <MovingDetails userProfile={userProfile} setUserProfile={setUserProfile} />
        <Email userProfile={userProfile} setUserProfile={setUserProfile} />
        <FullName userProfile={userProfile} setUserProfile={setUserProfile} />
        <PhoneNumber userProfile={userProfile} setUserProfile={setUserProfile} />
      </QuestionaireFlow>

      <h4>Current Information: </h4> <br/>
      <p>{JSON.stringify(userProfile)}</p>
    </div>
  );
}
