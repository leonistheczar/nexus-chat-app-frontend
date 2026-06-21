export default async function ProfileID({
    params,
}: {
    params: Promise<{ profileID: string }>;
}) {
    const { profileID } = await params;

    return (
        <>Profile Page {profileID}</>
    );
}