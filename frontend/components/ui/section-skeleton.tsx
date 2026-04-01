export function SectionSkeleton() {
    return(
        <section className="py-20 w-full max-w-7xl mx-auto px-4 sm::px-6 lg:px-8">
            {/* title Skeleton */}
            <div className="h-10 w-48 bg-muted animate-pulse rounded-md mb-6 mx-auto sm:mx-0"></div>

            {/*content skeleton (mimics a grid of cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[1,2,3].map((i) => (
                    <div key={i} className="w-full h-48 bg-muted animate-pulse rounded-md"></div>
                ))}
            </div>
        </section>
    )
}