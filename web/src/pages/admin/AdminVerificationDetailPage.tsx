import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { techniciansApi } from '../../api/technicians'
<<<<<<< HEAD
=======
import { AuthenticatedMedia } from '../../components/ui/AuthenticatedMedia'
>>>>>>> aced347 (after final corrections from all members)
import { Button } from '../../components/ui/Button'
import { ConfirmationModal } from '../../components/ui/ConfirmationModal'
import { EmptyState } from '../../components/ui/EmptyState'
import { ErrorState } from '../../components/ui/ErrorState'
import { FormField, TextArea } from '../../components/ui/FormField'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatusBadge } from '../../components/ui/StatusBadge'
<<<<<<< HEAD
import { useToastStore } from '../../store/toastStore'
import type { TechnicianApplicationDto } from '../../types/api'
import { formatDate, shortId } from '../../utils/format'
import { getApiError } from '../../utils/errors'

const checklist = [
  { label: 'Identity document provided', source: 'IDENTITY' },
  { label: 'Claimed qualification matches category', source: 'LICENSE / CERTIFICATE' },
  { label: 'Issuer can be verified', source: 'Manual admin check' },
  { label: 'No suspension on technician profile', source: 'Technician profile' },
]
=======
import { TechnicianAvatar } from '../../components/ui/TechnicianAvatar'
import { useToastStore } from '../../store/toastStore'
import type { DocumentDto, TechnicianApplicationDto } from '../../types/api'
import { formatDate } from '../../utils/format'
import { getApiError } from '../../utils/errors'

function evidenceLabel(type: string) {
  const normalized = type.toUpperCase()
  if (normalized === 'IDENTITY') return 'NIC / Identity'
  if (normalized === 'CERTIFICATE') return 'Studied certificate'
  if (normalized === 'LICENSE') return 'License'
  if (normalized === 'INSURANCE') return 'Insurance'
  return type.replaceAll('_', ' ')
}

function DocumentCard({ document }: { document: DocumentDto }) {
  return (
    <article className="rounded-2xl border border-black/8 bg-[#faf7f1] p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-semibold text-[#171717]">{evidenceLabel(document.evidenceType)}</p>
        <StatusBadge status={document.reviewStatus} />
      </div>
      <AuthenticatedMedia src={document.url} alt={evidenceLabel(document.evidenceType)} mimeType={document.mimeType} />
      <p className="mt-2 text-xs text-[#6d6a64]">{document.mimeType} · {formatDate(document.uploadedAt)}</p>
    </article>
  )
}
>>>>>>> aced347 (after final corrections from all members)

export function AdminVerificationDetailPage() {
  const { id } = useParams()
  const push = useToastStore((state) => state.push)
  const [item, setItem] = useState<TechnicianApplicationDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notes, setNotes] = useState('')
  const [action, setAction] = useState<'approve' | 'reject' | 'request-info' | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!id) return
    techniciansApi
      .adminApplication(id)
      .then((data) => {
        setItem(data)
        setNotes(data.decisionNotes ?? '')
      })
      .catch((err) => setError(getApiError(err).error))
      .finally(() => setLoading(false))
  }, [id])

  async function confirm() {
    if (!id || !action) return
    setBusy(true)
    try {
      const updated = await techniciansApi.decide(id, action, notes)
      setItem(updated)
      push('success', `Application ${action.replace('-', ' ')} recorded.`)
      setAction(null)
    } catch (err) {
      push('error', getApiError(err).error)
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading application" />
  if (error) return <ErrorState message={error} />
  if (!item) return <EmptyState title="Not found" description="This application is not available." />

<<<<<<< HEAD
=======
  const documents = item.documents ?? []
  const nic = documents.filter((doc) => doc.evidenceType.toUpperCase() === 'IDENTITY')
  const certificates = documents.filter((doc) => ['CERTIFICATE', 'LICENSE'].includes(doc.evidenceType.toUpperCase()))
  const other = documents.filter(
    (doc) => !['IDENTITY', 'CERTIFICATE', 'LICENSE'].includes(doc.evidenceType.toUpperCase()),
  )

>>>>>>> aced347 (after final corrections from all members)
  return (
    <div className="space-y-5">
      <PageHeader
        title="Verification decision"
<<<<<<< HEAD
        description="Approval is category-specific. This decision will not spill into other trades."
=======
        description="Check the profile photo, NIC, and certificate, then approve only this trade."
>>>>>>> aced347 (after final corrections from all members)
        actions={
          <Link to="/admin/verifications" className="text-sm font-medium text-[#c4a574] hover:text-[#171717]">
            Back to list
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-black/8 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
<<<<<<< HEAD
            <h2 className="font-semibold text-slate-900">Identity information</h2>
            <StatusBadge status={item.status} />
          </div>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-400">Technician</dt>
              <dd className="font-medium">{item.technicianId}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Claimed qualification</dt>
              <dd className="font-medium">{item.categoryName || '—'}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Issuer</dt>
              <dd>Not returned by the application API</dd>
            </div>
            <div>
              <dt className="text-slate-400">Certificate number</dt>
              <dd>Not returned by the application API</dd>
            </div>
            <div>
              <dt className="text-slate-400">Submitted</dt>
              <dd>{formatDate(item.submittedAt)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Checked date</dt>
              <dd>{formatDate(item.decidedAt)}</dd>
            </div>
          </dl>
=======
            <h2 className="font-semibold text-slate-900">Technician</h2>
            <StatusBadge status={item.status} />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <TechnicianAvatar name={item.technicianDisplayName} photoUrl={item.profilePhotoUrl} size={72} />
            <div>
              <p className="text-lg font-semibold text-[#171717]">{item.technicianDisplayName || 'Technician'}</p>
              <p className="text-sm text-[#6d6a64]">{item.technicianEmail || '—'}</p>
              <p className="mt-1 text-sm text-[#6d6a64]">{item.categoryName || '—'} · submitted {formatDate(item.submittedAt)}</p>
            </div>
          </div>
>>>>>>> aced347 (after final corrections from all members)
        </section>
        <section className="rounded-2xl border border-black/8 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Admin notes</h2>
          <FormField label="Decision notes">
            <TextArea value={notes} onChange={(event) => setNotes(event.target.value)} />
          </FormField>
          <div className="mt-4 flex flex-col gap-2">
            <Button onClick={() => setAction('approve')}>Approve</Button>
            <Button variant="secondary" onClick={() => setAction('request-info')}>
              Request More Information
            </Button>
            <Button variant="danger" onClick={() => setAction('reject')}>
              Reject
            </Button>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-black/8 bg-white p-5">
<<<<<<< HEAD
        <h2 className="font-semibold text-slate-900">Documents</h2>
        <p className="mt-1 text-sm text-slate-500">
          Document metadata is uploaded by the technician; this admin DTO does not include the file list.
        </p>
        <div className="mt-4">
          <EmptyState
            title="No documents in this payload"
            description={`Application ${shortId(item.id)} has no document collection on GET /api/admin/technician-applications/{id}.`}
          />
=======
        <h2 className="font-semibold text-slate-900">Profile photo</h2>
        <p className="mt-1 text-sm text-slate-500">Customers see this photo on quotations after you approve the technician.</p>
        <div className="mt-4">
          {item.profilePhotoUrl ? (
            <TechnicianAvatar name={item.technicianDisplayName} photoUrl={item.profilePhotoUrl} size={160} />
          ) : (
            <EmptyState title="No profile photo" description="The technician did not upload a profile picture." />
          )}
>>>>>>> aced347 (after final corrections from all members)
        </div>
      </section>

      <section className="rounded-2xl border border-black/8 bg-white p-5">
<<<<<<< HEAD
        <h2 className="font-semibold text-slate-900">Verification checklist</h2>
        <ul className="mt-4 space-y-3">
          {checklist.map((row) => (
            <li key={row.label} className="flex items-start justify-between gap-4 bg-[#f4efe6] px-4 py-3 text-sm">
              <div>
                <p className="font-medium text-slate-800">{row.label}</p>
                <p className="text-slate-500">Source: {row.source}</p>
              </div>
              <span className="text-xs text-slate-400">Manual</span>
            </li>
          ))}
        </ul>
=======
        <h2 className="font-semibold text-slate-900">NIC and certificates</h2>
        {documents.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No documents uploaded" description="Ask the technician to upload NIC and certificate from verification." />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {[...nic, ...certificates, ...other].map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        )}
>>>>>>> aced347 (after final corrections from all members)
      </section>

      <ConfirmationModal
        open={action !== null}
        title="Confirm verification decision"
        description="This writes the category application status on the server. It does not approve any other trade."
        confirmLabel={action === 'reject' ? 'Reject application' : 'Confirm'}
        tone={action === 'reject' ? 'danger' : 'default'}
        busy={busy}
        onClose={() => setAction(null)}
        onConfirm={() => void confirm()}
      />
    </div>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> aced347 (after final corrections from all members)
