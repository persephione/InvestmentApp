package investment;
 
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
 
@Component
public class InvestmentDao {
    // Injected database connection:
    @PersistenceContext private EntityManager em;
 
    // Stores a new investment:
    @Transactional
    public void persist(Investment investment) {
        em.persist(investment);
    }
 
    // Retrieves all the investments:
    public List<Investment> getAllInvestments() {
        TypedQuery<Investment> query = em.createQuery(
            "SELECT g FROM Investment g ORDER BY g.InvestmentID", Investment.class);
        return query.getResultList();
    }
    
    // Deletes an investment from the db:
    public void deleteInvestment(int id) {
        TypedQuery<Investment> query = em.createQuery(
            "SELECT FROM Investment WHERE InvestmentID = id", Investment.class);
    }
}