"use client";

import React, { useEffect, useState } from "react";

export interface Review {
    _id: string;
    reviewerName: string;
    reviewerEmail: string;
    reviewerTitle: string;
    reviewText: string;
    rating: number;
    displayOrder: number;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}

const ReviewTable: React.FC = () => {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const reviewsPerPage = 10;

    const rawPort = process.env.NEXT_PUBLIC_BACKEND_PORT || "";
    const API_BASE = rawPort.replace(/\/$/, ""); 

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

            const response = await fetch(`${API_BASE}/api/reviews/all`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch reviews");
            }

           const result = await response.json();

            // Check for success and map the inner data array
            if (result.success) {
                const sortedReviews = result.data.sort(
                    (a: Review, b: Review) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setReviews(sortedReviews);
            } else {
                throw new Error(result.message || "Failed to load reviews");
            }

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // --- Toggle Approval Status ---
    const handleToggleApproval = async (review: Review) => {
        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

            // We send a PUT request to update the approval status
            const response = await fetch(`${API_BASE}/api/reviews/${review._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...review, isApproved: !review.isApproved })
            });

            if (!response.ok) throw new Error("Failed to update approval status");

            // Update UI instantly without full refetch
            setReviews(prev => prev.map(r => 
                r._id === review._id ? { ...r, isApproved: !r.isApproved } : r
            ));

        } catch (error: any) {
            console.error("Approval error:", error);
            alert(`Error updating status: ${error.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to completely delete this review?")) {
            return;
        }

        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

            const response = await fetch(`${API_BASE}/api/reviews/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to delete review`);
            }

            setReviews((prevReviews) => 
                prevReviews.filter((review) => review._id !== id)
            );

            if (currentReviews.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

        } catch (error: any) {
            console.error("Delete error:", error);
            alert(`Error deleting review: ${error.message}`);
        }
    };

    // Pagination logic
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div style={{ padding: "20px", color: "black", fontWeight: "900", fontSize: "1.2rem" }}>
                Loading Review Queue...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "20px", color: "#dc2626", fontWeight: "bold", fontSize: "1.1rem" }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div style={{ padding: '10px', color: "black", fontFamily: 'sans-serif' }}>
            <h2 style={{ marginBottom: "20px", color: "black", fontWeight: "900" }}>
                Review Moderation Queue
            </h2>

            <div className="overflow-x-auto">
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: "black", minWidth: '800px' }}>
                    <thead>
                        <tr style={{ backgroundColor: "navy", textAlign: "left", color: "white" }}>
                            <th style={tableHeaderStyle}>#</th>
                            <th style={tableHeaderStyle}>Reviewer</th>
                            <th style={tableHeaderStyle}>Rating</th>
                            <th style={tableHeaderStyle}>Review Text</th>
                            <th style={tableHeaderStyle}>Status</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentReviews.length > 0 ? (
                            currentReviews.map((review, index) => (
                                <tr key={review._id} className="border-b border-gray-200 hover:bg-gray-50">

                                    <td style={tableCellStyle} className="text-gray-900 font-bold">
                                        {indexOfFirstReview + index + 1}
                                    </td>

                                    <td style={tableCellStyle}>
                                        <strong className="text-gray-900" style={{ fontSize: "1.05rem" }}>
                                            {review.reviewerName}
                                        </strong>
                                        <br />
                                        <small className="text-gray-600 font-medium">{review.reviewerTitle}</small>
                                        <br />
                                        <small className="text-gray-400">{review.reviewerEmail}</small>
                                    </td>

                                    <td className="text-gray-900 font-medium" style={tableCellStyle}>
                                        <span className="text-yellow-500 text-lg">
                                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                        </span>
                                    </td>

                                    <td className="text-gray-600 text-sm" style={{ ...tableCellStyle, maxWidth: "300px" }}>
                                        <p className="line-clamp-3" title={review.reviewText}>
                                            "{review.reviewText}"
                                        </p>
                                    </td>

                                    <td style={tableCellStyle}>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            review.isApproved 
                                                ? "bg-green-100 text-green-700 border border-green-200" 
                                                : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                        }`}>
                                            {review.isApproved ? "Approved" : "Pending"}
                                        </span>
                                    </td>

                                    <td style={tableCellStyle}>
                                        <button
                                            onClick={() => handleToggleApproval(review)}
                                            style={{ color: review.isApproved ? "#d97706" : "#059669", marginRight: '15px', cursor: 'pointer', fontWeight: "bold", background: "none", border: "none" }}
                                        >
                                            {review.isApproved ? "Revoke" : "Approve"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            style={{ color: "red", cursor: 'pointer', fontWeight: "bold", background: "none", border: "none" }}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    style={{ textAlign: 'center', padding: "40px", color: "black", fontWeight: "900", fontSize: "1.2rem" }}
                                >
                                    No Reviews Pending Moderation
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center', color: 'black', fontWeight: 'bold' }}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                        style={{ padding: "5px 10px", cursor: currentPage === 1 ? "not-allowed" : "pointer", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                        style={{ padding: "5px 10px", cursor: currentPage === totalPages ? "not-allowed" : "pointer", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

const tableHeaderStyle = { padding: '12px', borderBottom: '2px solid black' };
const tableCellStyle = { padding: '12px', borderBottom: '1px solid #ccc' };

export default ReviewTable;