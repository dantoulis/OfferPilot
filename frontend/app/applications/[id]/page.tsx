import { ApplicationDetailsPage } from "@/components/offerpilot/application-details-page"

const ApplicationRoutePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return <ApplicationDetailsPage id={id} />
}

export default ApplicationRoutePage
