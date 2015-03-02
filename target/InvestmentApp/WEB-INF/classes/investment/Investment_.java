package investment;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2015-03-01T15:05:30")
@StaticMetamodel(Investment.class)
public class Investment_ { 

    public static volatile SingularAttribute<Investment, Integer> Stock1NumShares;
    public static volatile SingularAttribute<Investment, Float> InvestedAmount;
    public static volatile SingularAttribute<Investment, Float> Stock1CurrentPrice;
    public static volatile SingularAttribute<Investment, Float> Stock2CurrentPrice;
    public static volatile SingularAttribute<Investment, Float> LeftoverAmount;
    public static volatile SingularAttribute<Investment, String> Stock1Symbol;
    public static volatile SingularAttribute<Investment, String> Stock2Symbol;
    public static volatile SingularAttribute<Investment, Integer> Stock2Percent;
    public static volatile SingularAttribute<Investment, Integer> Stock3Percent;
    public static volatile SingularAttribute<Investment, Integer> InvestmentID;
    public static volatile SingularAttribute<Investment, Integer> Stock3NumShares;
    public static volatile SingularAttribute<Investment, String> InvestorName;
    public static volatile SingularAttribute<Investment, Integer> Stock1Percent;
    public static volatile SingularAttribute<Investment, Integer> Stock2NumShares;
    public static volatile SingularAttribute<Investment, String> PurchaseDate;
    public static volatile SingularAttribute<Investment, String> Stock3Symbol;
    public static volatile SingularAttribute<Investment, Float> Stock3CurrentPrice;

}