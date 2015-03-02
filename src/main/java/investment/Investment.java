package investment;
 
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
 
@Entity
public class Investment implements Serializable {
    private static final long serialVersionUID = 1L;
 
    // Persistent Fields:
    @Id @GeneratedValue
    int InvestmentID;
    private String InvestorName;
    private String PurchaseDate;
    private float InvestedAmount;
    private float LeftoverAmount;
    
    private String Stock1Symbol;
    private float Stock1CurrentPrice;
    private int Stock1NumShares;
    private int Stock1Percent;
    
    private String Stock2Symbol;
    private float Stock2CurrentPrice;
    private int Stock2NumShares;
    private int Stock2Percent;

    private String Stock3Symbol;
    private float Stock3CurrentPrice;
    private int Stock3NumShares;
    private int Stock3Percent;
 
    // Constructors:
    public Investment() {
    }
 
    public Investment(String investorName, String purchaseDate, float investedAmount, float leftoverAmount, 
            String stock1Symbol, float stock1CurrentPrice, int stock1NumShares, int stock1Percent,
            String stock2Symbol, float stock2CurrentPrice, int stock2NumShares, int stock2Percent, 
            String stock3Symbol, float stock3CurrentPrice, int stock3NumShares, int stock3Percent) {
        
        this.InvestorName = investorName;  
        this.PurchaseDate = purchaseDate;
        this.InvestedAmount = investedAmount;
        this.LeftoverAmount = leftoverAmount;

        this.Stock1Symbol = stock1Symbol;
        this.Stock1CurrentPrice = stock1CurrentPrice;
        this.Stock1NumShares = stock1NumShares;
        this.Stock1Percent = stock1Percent;

        this.Stock2Symbol = stock2Symbol;
        this.Stock2CurrentPrice = stock2CurrentPrice;
        this.Stock2NumShares = stock2NumShares;
        this.Stock2Percent = stock2Percent;

        this.Stock3Symbol = stock3Symbol;
        this.Stock3CurrentPrice = stock3CurrentPrice;
        this.Stock3NumShares = stock3NumShares;
        this.Stock3Percent = stock3Percent;
    }
 
    // String Representation:
    @Override
    public String toString() {
        return  " (Investor Name: " + InvestorName + ") " +
                " (PurchaseDate: " + PurchaseDate + ") " +
                " (InvestedAmount: " + InvestedAmount + ") " +
                " (LeftoverAmount: " + LeftoverAmount + ") " +
                " (Stock1Symbol: " + Stock1Symbol + ") " +
                " (Stock1CurrentPrice: " + Stock1CurrentPrice + ") " +
                " (Stock1NumShares: " + Stock1NumShares + ") " +
                " (Stock1Percent: " + Stock1Percent + ") " +
                " (Stock2Symbol: " + Stock2Symbol + ") " +
                " (Stock2CurrentPrice : " + Stock2CurrentPrice + ") " +
                " (Stock2NumShares : " + Stock2NumShares + ") " +
                " (Stock2Percent : " + Stock2Percent + ") " +
                " (Stock3Symbol : " + Stock3Symbol + ") " +
                " (Stock3CurrentPrice : " + Stock3CurrentPrice + ") " +
                " (Stock3NumShares: " + Stock3NumShares + ") " +
                " (Stock3Percent: " + Stock3Percent + ") ";
    }
}