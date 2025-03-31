import pytest
from app.crud import calculate_credit_rating

# Function to mock getting average credit score from stored records
def mock_get_avg_credit_score():
    return 680  # Sample average credit score for testing

@pytest.mark.parametrize(
    "loanAmount, propertyValue, debtAmount, annualIncome, creditScore, loanType, propertyType, expected_score",
    [
        (200000, 250000, 50000, 100000, 720, "Fixed-rate", "Single-family", "AAA"),
        (150000, 180000, 70000, 120000, 680, "Adjustable-rate", "Condo", "BBB"),
        (300000, 350000, 120000, 200000, 640, "Fixed-rate", "Single-family", "BBB"),
    ],
)
def test_credit_rating_valid_inputs(loanAmount, propertyValue, debtAmount, annualIncome, creditScore, loanType, propertyType, expected_score):
    mortgage_data = {
        "loanAmount": loanAmount,
        "propertyValue": propertyValue,
        "debtAmount": debtAmount,
        "annualIncome": annualIncome,
        "creditScore": creditScore,
        "loanType": loanType,
        "propertyType": propertyType,
        "avg_credit_score": mock_get_avg_credit_score(),  # Pass computed avg_credit_score
    }
    rating = calculate_credit_rating(**mortgage_data)

    # Compare directly with expected string rating
    assert rating == expected_score


# Test for negative loan amount
def test_credit_rating_negative_loan_amount():
    mortgage_data = {
        "loanAmount": -50000,  # Invalid negative value
        "propertyValue": 100000,
        "debtAmount": 20000,
        "annualIncome": 50000,
        "creditScore": 700,
        "loanType": "Fixed-rate",
        "propertyType": "Single-family",
        "avg_credit_score": mock_get_avg_credit_score(),
    }

    # Ensure function raises ValueError for negative loan amount
    with pytest.raises(ValueError, match="Loan amount cannot be negative"):
        calculate_credit_rating(**mortgage_data)


# Test for invalid credit score (out of range)
@pytest.mark.parametrize("invalid_score", [200, 900])  # Invalid scores outside 300-850
def test_credit_rating_invalid_credit_score(invalid_score):
    mortgage_data = {
        "loanAmount": 50000,
        "propertyValue": 100000,
        "debtAmount": 20000,
        "annualIncome": 50000,
        "creditScore": invalid_score,
        "loanType": "Fixed-rate",
        "propertyType": "Single-family",
        "avg_credit_score": mock_get_avg_credit_score(),
    }

    # Ensure function raises ValueError for out-of-range credit scores
    with pytest.raises(ValueError, match="Credit score must be between 300 and 850"):
        calculate_credit_rating(**mortgage_data)


# Test for missing required values
def test_credit_rating_missing_values():
    mortgage_data = {
        "loanAmount": 50000,
        "propertyValue": 100000,
        "debtAmount": None,  # Missing value
        "annualIncome": 50000,
        "creditScore": 700,
        "loanType": "Fixed-rate",
        "propertyType": "Single-family",
        "avg_credit_score": mock_get_avg_credit_score(),
    }

    # Ensure function raises TypeError when required values are missing
    with pytest.raises(TypeError):
        calculate_credit_rating(**mortgage_data)