import pandas as pd
from itertools import combinations

def cohen_kappa(rater1, rater2):
    """
    Calculate Cohen's Kappa for agreement between two raters.
    
    Parameters:
        rater1 (pd.Series): Ratings from the first rater.
        rater2 (pd.Series): Ratings from the second rater.

    Returns:
        float: Cohen's Kappa coefficient.
    """
    assert len(rater1) == len(rater2), "Rater series must have the same length."
    
    agreement = (rater1 == rater2).sum()
    p_o = agreement / len(rater1)
    
    categories = set(rater1.unique()).union(rater2.unique())
    rater1_counts = rater1.value_counts(normalize=True).reindex(categories, fill_value=0)
    rater2_counts = rater2.value_counts(normalize=True).reindex(categories, fill_value=0)
    
    p_e = (rater1_counts * rater2_counts).sum()
    
    kappa = (p_o - p_e) / (1 - p_e) if (1 - p_e) != 0 else 0  # Handle the case where p_e is 1 which can cause division by zero
    return kappa

def calc_dataset_kappa(dataset, annotator_columns):
    """
    Calculate the average Cohen's Kappa for all pairs of annotators.

    Parameters:
        dataset (pd.DataFrame): The dataset containing annotations.
        annotator_columns (list): List of columns representing different annotators.

    Returns:
        float: The average Cohen's Kappa across all annotator pairs.
    """
    kappa_scores = []
    for annotator_pair in combinations(annotator_columns, 2):
        rater1, rater2 = dataset[annotator_pair[0]], dataset[annotator_pair[1]]
        kappa_score = cohen_kappa(rater1, rater2)
        kappa_scores.append(kappa_score)
        print(f"Cohen's Kappa between {annotator_pair[0]} and {annotator_pair[1]}: {kappa_score:.3f}")

    return sum(kappa_scores) / len(kappa_scores) if kappa_scores else float('nan')  # Handle division by zero if no kappa scores were calculated

# Example usage
if __name__ == "__main__":
    df = pd.read_csv('ar_comments_50_Labelled_final.csv')
    print(df.columns)

    annotator_columns = ['annotator1', 'annotator2', 'annotator3']  # List of columns containing annotations
    average_kappa = calc_dataset_kappa(df, annotator_columns)
    print(f"Average Cohen's Kappa: {average_kappa:.3f}")
