import Debug "mo:base/Debug";
import Time "mo:base/Time";

actor {
  stable var reviews : [Review] = [];

  public type Review = {
    id: Nat;
    user: Text;
    content: Text;
    rating: Nat;
    timestamp: Int;
  };

  public func addReview(user: Text, content: Text, rating: Nat) : async () {
    let review = {
      id = reviews.size();
      user;
      content;
      rating;
      timestamp = Time.now();
    };
    reviews := reviews # [review];
  };

  public func getReviews() : async [Review] {
    return reviews;
  };
};

