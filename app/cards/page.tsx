"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Lock,
  Wifi,
  MoreVertical,
  Trash2,
  Settings,
  Copy,
  Check,
} from "lucide-react";
import styles from "./CardsPage.module.css";

interface Card {
  id: string;
  type: "virtual" | "physical";
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  color: string;
  brand: "visa" | "mastercard";
  status: "active" | "frozen" | "blocked";
}

const Cards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      type: "physical",
      cardNumber: "4532 7851 2349 8765",
      cardHolder: "JOHN DAVIDSON",
      expiryDate: "12/27",
      cvv: "842",
      balance: 8549.32,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      brand: "visa",
      status: "active",
    },
    {
      id: "2",
      type: "virtual",
      cardNumber: "5421 6789 3421 9087",
      cardHolder: "JOHN DAVIDSON",
      expiryDate: "09/26",
      cvv: "123",
      balance: 2450.0,
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      brand: "mastercard",
      status: "active",
    },
    {
      id: "3",
      type: "virtual",
      cardNumber: "4916 3456 7890 1234",
      cardHolder: "JOHN DAVIDSON",
      expiryDate: "03/28",
      cvv: "456",
      balance: 15750.5,
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      brand: "visa",
      status: "frozen",
    },
  ]);

  const [selectedCard, setSelectedCard] = useState<string>(cards[0].id);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showAddCard, setShowAddCard] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string>("");

  const getSelectedCardData = () => {
    return cards.find((card) => card.id === selectedCard) || cards[0];
  };

  const maskCardNumber = (number: string) => {
    const parts = number.split(" ");
    return `${parts[0]} •••• •••• ${parts[3]}`;
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const handleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  const currentCard = getSelectedCardData();

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
            <h1 className={styles.title}>My Cards</h1>
            <p className={styles.subtitle}>Manage your payment cards</p>
          </div>
          <button className={styles.addCardBtn} onClick={handleAddCard}>
            <Plus size={20} />
            <span>Add Card</span>
          </button>
        </header>

        <div className={styles.mainCard}>
          <div
            className={styles.card}
            style={{ background: currentCard.color }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardType}>
                {currentCard.type === "virtual" && <Wifi size={20} />}
                <span>
                  {currentCard.type === "virtual"
                    ? "Virtual Card"
                    : "Physical Card"}
                </span>
              </div>
              <div className={styles.cardBrand}>
                {currentCard.brand === "visa" ? "VISA" : "Mastercard"}
              </div>
            </div>

            <div className={styles.cardChip}></div>

            <div className={styles.cardNumber}>
              {showDetails
                ? currentCard.cardNumber
                : maskCardNumber(currentCard.cardNumber)}
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.cardInfo}>
                <div className={styles.cardInfoItem}>
                  <span className={styles.cardLabel}>Card Holder</span>
                  <span className={styles.cardValue}>
                    {currentCard.cardHolder}
                  </span>
                </div>
                <div className={styles.cardInfoItem}>
                  <span className={styles.cardLabel}>Expires</span>
                  <span className={styles.cardValue}>
                    {currentCard.expiryDate}
                  </span>
                </div>
                {showDetails && (
                  <div className={styles.cardInfoItem}>
                    <span className={styles.cardLabel}>CVV</span>
                    <span className={styles.cardValue}>{currentCard.cvv}</span>
                  </div>
                )}
              </div>
            </div>

            {currentCard.status === "frozen" && (
              <div className={styles.cardStatusOverlay}>
                <Lock size={32} />
                <span>Card Frozen</span>
              </div>
            )}
          </div>

          <div className={styles.cardActions}>
            <button
              className={styles.actionBtn}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <EyeOff size={20} /> : <Eye size={20} />}
              <span>{showDetails ? "Hide Details" : "Show Details"}</span>
            </button>
            <div className={styles.balanceInfo}>
              <span className={styles.balanceLabel}>Available Balance</span>
              <span className={styles.balanceAmount}>
                $
                {currentCard.balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className={styles.detailsCard}>
            <h3 className={styles.detailsTitle}>Card Details</h3>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Card Number</span>
                <div className={styles.detailValueRow}>
                  <span className={styles.detailValue}>
                    {currentCard.cardNumber}
                  </span>
                  <button
                    className={styles.copyBtn}
                    onClick={() =>
                      handleCopy(
                        currentCard.cardNumber.replace(/\s/g, ""),
                        "card"
                      )
                    }
                  >
                    {copiedField === "card" ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>CVV</span>
                <div className={styles.detailValueRow}>
                  <span className={styles.detailValue}>{currentCard.cvv}</span>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(currentCard.cvv, "cvv")}
                  >
                    {copiedField === "cvv" ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Expiry Date</span>
                <div className={styles.detailValueRow}>
                  <span className={styles.detailValue}>
                    {currentCard.expiryDate}
                  </span>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(currentCard.expiryDate, "expiry")}
                  >
                    {copiedField === "expiry" ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.cardsList}>
          <h3 className={styles.cardsListTitle}>All Cards</h3>
          <div className={styles.cardsGrid}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={`${styles.miniCard} ${
                  selectedCard === card.id ? styles.miniCardSelected : ""
                }`}
                onClick={() => setSelectedCard(card.id)}
                style={{ background: card.color }}
              >
                <div className={styles.miniCardHeader}>
                  <div className={styles.miniCardType}>
                    {card.type === "virtual" ? (
                      <Wifi size={14} />
                    ) : (
                      <CreditCard size={14} />
                    )}
                  </div>
                  <button className={styles.miniCardMenu}>
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className={styles.miniCardNumber}>
                  •••• {card.cardNumber.split(" ")[3]}
                </div>
                <div className={styles.miniCardFooter}>
                  <span className={styles.miniCardBalance}>
                    $
                    {card.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  {card.status === "frozen" && (
                    <Lock size={14} className={styles.miniCardLock} />
                  )}
                </div>
                {selectedCard === card.id && (
                  <div className={styles.selectedIndicator}></div>
                )}
              </div>
            ))}
            <button className={styles.addCardMini} onClick={handleAddCard}>
              <Plus size={24} />
              <span>Add New Card</span>
            </button>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
          <div className={styles.actionsGrid}>
            <button className={styles.quickActionBtn}>
              <Lock size={20} />
              <span>Freeze Card</span>
            </button>
            <button className={styles.quickActionBtn}>
              <Settings size={20} />
              <span>Card Settings</span>
            </button>
            <button className={`${styles.quickActionBtn} ${styles.dangerBtn}`}>
              <Trash2 size={20} />
              <span>Delete Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
