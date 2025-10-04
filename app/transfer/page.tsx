"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  User,
  DollarSign,
  MessageSquare,
  Check,
  Shield,
  Zap,
} from "lucide-react";
import styles from "./TransferPage.module.css";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

const Transfer: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [step, setStep] = useState<number>(1);

  const recentContacts: Contact[] = [
    { id: "1", name: "Sarah Johnson", avatar: "👩‍💼", username: "@sjohnson" },
    { id: "2", name: "Mike Chen", avatar: "👨‍💻", username: "@mchen" },
    { id: "3", name: "Emily Davis", avatar: "👩‍🎨", username: "@edavis" },
    { id: "4", name: "Alex Kumar", avatar: "👨‍🔬", username: "@akumar" },
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setRecipient(contact.username);
  };

  const handleContinue = () => {
    if (step === 1 && amount && recipient) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      setTimeout(() => {
        setStep(1);
        setAmount("");
        setRecipient("");
        setNote("");
        setSelectedContact(null);
      }, 3000);
    }
  };

  const balance = 12847.5;

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradient1}></div>
        <div className={styles.gradient2}></div>
        <div className={styles.gradient3}></div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Send Money</h1>
            <p className={styles.subtitle}>
              Transfer funds instantly and securely
            </p>
          </div>
          <div className={styles.balanceCard}>
            <span className={styles.balanceLabel}>Available Balance</span>
            <span className={styles.balanceAmount}>
              ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </header>

        {step === 1 && (
          <div className={styles.formCard}>
            <div className={styles.stepIndicator}>
              <div className={`${styles.stepDot} ${styles.active}`}></div>
              <div className={styles.stepLine}></div>
              <div className={styles.stepDot}></div>
            </div>

            <div className={styles.formContainer}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <DollarSign className={styles.labelIcon} size={20} />
                  Amount
                </label>
                <div className={styles.amountInputWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    className={styles.amountInput}
                  />
                </div>
                <div className={styles.quickAmounts}>
                  {[50, 100, 250, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt.toString())}
                      className={styles.quickAmountBtn}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <User className={styles.labelIcon} size={20} />
                  Recipient
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Username, email, or phone"
                  className={styles.textInput}
                />
              </div>

              <div className={styles.contactsSection}>
                <h3 className={styles.contactsTitle}>Recent Contacts</h3>
                <div className={styles.contactsGrid}>
                  {recentContacts.map((contact) => (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() => handleContactSelect(contact)}
                      className={`${styles.contactCard} ${
                        selectedContact?.id === contact.id
                          ? styles.selected
                          : ""
                      }`}
                    >
                      <div className={styles.contactAvatar}>
                        {contact.avatar}
                      </div>
                      <div className={styles.contactInfo}>
                        <span className={styles.contactName}>
                          {contact.name}
                        </span>
                        <span className={styles.contactUsername}>
                          {contact.username}
                        </span>
                      </div>
                      {selectedContact?.id === contact.id && (
                        <Check className={styles.checkIcon} size={20} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <MessageSquare className={styles.labelIcon} size={20} />
                  Note (Optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a message..."
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className={styles.submitBtn}
                disabled={!amount || !recipient}
              >
                <span>Continue</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.formCard}>
            <div className={styles.stepIndicator}>
              <div className={`${styles.stepDot} ${styles.completed}`}>
                <Check size={14} />
              </div>
              <div className={`${styles.stepLine} ${styles.completed}`}></div>
              <div className={`${styles.stepDot} ${styles.active}`}></div>
            </div>

            <div className={styles.confirmSection}>
              <h2 className={styles.confirmTitle}>Review Transfer</h2>
              <div className={styles.confirmDetails}>
                <div className={styles.confirmRow}>
                  <span className={styles.confirmLabel}>Amount</span>
                  <span className={styles.confirmValue}>
                    $
                    {parseFloat(amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className={styles.confirmRow}>
                  <span className={styles.confirmLabel}>To</span>
                  <span className={styles.confirmValue}>{recipient}</span>
                </div>
                {note && (
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Note</span>
                    <span className={styles.confirmValue}>{note}</span>
                  </div>
                )}
                <div className={styles.confirmRow}>
                  <span className={styles.confirmLabel}>Fee</span>
                  <span className={styles.confirmValueFree}>Free</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.confirmRow}>
                  <span className={styles.confirmLabelTotal}>Total</span>
                  <span className={styles.confirmValueTotal}>
                    $
                    {parseFloat(amount).toLocaleString("en-US", {
                      minimumFractionDigals: 2,
                    })}
                  </span>
                </div>
              </div>

              <div className={styles.securityFeatures}>
                <div className={styles.securityItem}>
                  <Shield size={18} />
                  <span>Bank-level encryption</span>
                </div>
                <div className={styles.securityItem}>
                  <Zap size={18} />
                  <span>Instant transfer</span>
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button onClick={() => setStep(1)} className={styles.backBtn}>
                  Back
                </button>
                <button onClick={handleContinue} className={styles.confirmBtn}>
                  Confirm Transfer
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.formCard}>
            <div className={styles.successAnimation}>
              <div className={styles.successCircle}>
                <Check size={48} />
              </div>
            </div>
            <div className={styles.successContent}>
              <h2 className={styles.successTitle}>Transfer Successful!</h2>
              <p className={styles.successMessage}>
                $
                {parseFloat(amount).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}{" "}
                sent to {recipient}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfer;
