export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Details</h1>
            <hr />
            <p className="bg-amber-500">Profile page {params.id}</p>
        </div>
    )
}