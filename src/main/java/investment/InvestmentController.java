package investment;
 
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
 
@Controller
public class InvestmentController {
 
    @Autowired
    private InvestmentDao investmentDao;
 
    @RequestMapping(value="/investment")
    public ModelAndView investmentapp(HttpServletRequest request) {
        // Handle a new investment (if any):
        String InvestorName = request.getParameter("InvestorName");
        
        // assign current datetime to purchasedate of investment
        Date today = new Date(System.currentTimeMillis());
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");       
        String PurchaseDate = df.format(today);
        
        float InvestedAmount = 0.00f; 
        float LeftoverAmount = 0.00f;
        
        String Stock1Symbol = "";
        float Stock1CurrentPrice = 0.00f;
        int Stock1NumShares = 0; 
        int Stock1Percent = 0; 
        
        String Stock2Symbol = "";
        float Stock2CurrentPrice = 0.00f;
        int Stock2NumShares = 0; 
        int Stock2Percent = 0; 
        
        String Stock3Symbol = "";
        float Stock3CurrentPrice = 0.00f; 
        int Stock3NumShares = 0; 
        int Stock3Percent = 0; 
        
        if(InvestorName != null) {
            InvestedAmount = Float.valueOf(request.getParameter("InvestedAmount")); 
             

            Stock1Symbol = request.getParameter("Stock1Symbol");
            Stock1CurrentPrice = Float.valueOf(request.getParameter("Stock1CurrentPrice"));
            Stock1NumShares = Integer.parseInt(request.getParameter("Stock1NumShares")); 
            Stock1Percent = Integer.parseInt(request.getParameter("Stock1Percent")); 

            Stock2Symbol = request.getParameter("Stock2Symbol");
            Stock2CurrentPrice = Float.valueOf(request.getParameter("Stock2CurrentPrice"));
            Stock2NumShares = Integer.parseInt(request.getParameter("Stock2NumShares")); 
            Stock2Percent = Integer.parseInt(request.getParameter("Stock2Percent")); 

            Stock3Symbol = request.getParameter("Stock3Symbol");
            Stock3CurrentPrice = Float.valueOf(request.getParameter("Stock3CurrentPrice"));
            Stock3NumShares = Integer.parseInt(request.getParameter("Stock3NumShares")); 
            Stock3Percent = Integer.parseInt(request.getParameter("Stock3Percent"));
            
            LeftoverAmount = Float.valueOf(request.getParameter("LeftoverAmount"));
        }
        
        if (InvestorName != null) {
            //investmentDao.persist(new Investment(InvestorName));
            investmentDao.persist(new Investment(InvestorName, PurchaseDate, InvestedAmount, LeftoverAmount, 
                    Stock1Symbol, Stock1CurrentPrice, Stock1NumShares, Stock1Percent, 
                    Stock2Symbol, Stock2CurrentPrice, Stock2NumShares, Stock2Percent, 
                    Stock3Symbol, Stock3CurrentPrice, Stock3NumShares, Stock3Percent));
        }
 
        // Prepare the result view (investment.jsp):
        return new ModelAndView("investment.jsp", "investmentDao", investmentDao);
    }
}