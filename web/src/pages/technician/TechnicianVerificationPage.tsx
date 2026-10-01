import { useEffect, useState, type FormEvent } from 'react'
import { categoriesApi } from '../../api/categories'
import { techniciansApi } from '../../api/technicians'
import { Button } from '../../components/ui/Button'
import { ErrorState } from '../../components/ui/ErrorState'
<<<<<<< HEAD
import { FilePreview } from '../../components/ui/FilePreview'
=======
import { AuthenticatedMedia } from '../../components/ui/AuthenticatedMedia'
>>>>>>> aced347 (after final corrections from all members)
import { FormField, SelectInput } from '../../components/ui/FormField'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useToastStore } from '../../store/toastStore'
<<<<<<< HEAD
import type { CategoryDto, DocumentDto, TechnicianApplicationDto } from '../../types/api'
=======
import type { CategoryDto, TechnicianApplicationDto } from '../../types/api'
>>>>>>> aced347 (after final corrections from all members)
import { formatDate } from '../../utils/format'
import { getApiError } from '../../utils/errors'

export function TechnicianVerificationPage() {
  const push = useToastStore((state) => state.push)
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [applications, setApplications] = useState<TechnicianApplicationDto[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [applicationId, setApplicationId] = useState('')
  const [evidenceType, setEvidenceType] = useState('LICENSE')
  const [file, setFile] = useState<File | null>(null)
<<<<<<< HEAD
  const [uploads, setUploads] = useState<DocumentDto[]>([])
=======
>>>>>>> aced347 (after final corrections from all members)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([categoriesApi.list(), techniciansApi.myApplications()])
      .then(([cats, apps]) => {
        setCategories(cats)
        setApplications(apps)
<<<<<<< HEAD
=======
        setCategoryId((current) => current || cats[0]?.id || '')
        setApplicationId((current) => current || apps[0]?.id || '')
>>>>>>> aced347 (after final corrections from all members)
      })
      .catch((err) => setError(getApiError(err).error))
  }, [])

  async function apply(event: FormEvent) {
    event.preventDefault()
    if (!categoryId) return
    try {
      const created = await techniciansApi.apply(categoryId)
      setApplications((current) => {
        const others = current.filter((item) => item.id !== created.id)
        return [created, ...others]
      })
      push('success', 'Category application submitted.')
    } catch (err) {
      push('error', getApiError(err).error)
    }
  }

  async function upload(event: FormEvent) {
    event.preventDefault()
    if (!applicationId || !file) return
    try {
      const document = await techniciansApi.uploadDocument(applicationId, file, evidenceType)
<<<<<<< HEAD
      setUploads((current) => [document, ...current])
=======
      setApplications((current) =>
        current.map((item) =>
          item.id === applicationId
            ? { ...item, documents: [document, ...(item.documents ?? [])], evidenceCount: (item.evidenceCount ?? 0) + 1 }
            : item,
        ),
      )
>>>>>>> aced347 (after final corrections from all members)
      push('success', 'Document uploaded.')
    } catch (err) {
      push('error', getApiError(err).error)
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Verification status"
        description="Apply per category. Approval for one trade never unlocks another."
      />
      {error ? <ErrorState message={error} /> : null}
      <form className="grid gap-4 rounded-2xl border border-black/8 bg-white p-5 md:grid-cols-2" onSubmit={apply}>
        <FormField label="Category">
          <SelectInput value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
            <option value="">Select a category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectInput>
        </FormField>
        <div className="flex items-end">
          <Button type="submit">Apply for category</Button>
        </div>
      </form>

      <section className="rounded-2xl border border-black/8 bg-white p-5">
        <h2 className="font-semibold text-slate-900">Applications</h2>
        <ul className="mt-3 space-y-2">
          {applications.map((item) => (
<<<<<<< HEAD
            <li key={item.id} className="flex items-center justify-between bg-[#f4efe6] px-4 py-3 text-sm">
              <div>
                <p className="font-medium">{item.categoryName}</p>
                <p className="text-slate-500">Submitted {formatDate(item.submittedAt)}</p>
              </div>
              <StatusBadge status={item.status} />
=======
            <li key={item.id} className="space-y-3 bg-[#f4efe6] px-4 py-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{item.categoryName}</p>
                  <p className="text-slate-500">Submitted {formatDate(item.submittedAt)}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
              {(item.documents ?? []).length === 0 ? (
                <p className="text-slate-500">No NIC, photo, or certificate uploaded yet for this trade.</p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {(item.documents ?? []).map((document) => (
                    <div key={document.id} className="rounded-xl bg-white p-3">
                      <p className="mb-2 font-medium">{document.evidenceType.replaceAll('_', ' ')}</p>
                      <AuthenticatedMedia src={document.url} alt={document.evidenceType} mimeType={document.mimeType} />
                    </div>
                  ))}
                </div>
              )}
>>>>>>> aced347 (after final corrections from all members)
            </li>
          ))}
        </ul>
      </section>

      <form className="space-y-3 rounded-2xl border border-black/8 bg-white p-5" onSubmit={upload}>
        <h2 className="font-semibold text-slate-900">Upload evidence</h2>
        <FormField label="Application">
          <SelectInput value={applicationId} onChange={(event) => setApplicationId(event.target.value)}>
            <option value="">Select application</option>
            {applications.map((item) => (
              <option key={item.id} value={item.id}>
                {item.categoryName}
              </option>
            ))}
          </SelectInput>
        </FormField>
        <FormField label="Evidence type">
          <SelectInput value={evidenceType} onChange={(event) => setEvidenceType(event.target.value)}>
<<<<<<< HEAD
            <option>IDENTITY</option>
            <option>LICENSE</option>
            <option>INSURANCE</option>
            <option>CERTIFICATE</option>
            <option>WORK_SAMPLE</option>
            <option>OTHER</option>
=======
            <option value="IDENTITY">NIC / Identity</option>
            <option value="LICENSE">License</option>
            <option value="INSURANCE">Insurance</option>
            <option value="CERTIFICATE">Studied certificate</option>
            <option value="WORK_SAMPLE">Work sample</option>
            <option value="OTHER">Other</option>
>>>>>>> aced347 (after final corrections from all members)
          </SelectInput>
        </FormField>
        <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
        <Button type="submit">Upload document</Button>
<<<<<<< HEAD
        <div className="space-y-2">
          {uploads.map((item) => (
            <FilePreview key={item.id} name={item.storageKey} mimeType={item.mimeType} uploadedAt={item.uploadedAt} />
          ))}
        </div>
      </form>
    </div>
  )
}
=======
      </form>
    </div>
  )
}
>>>>>>> aced347 (after final corrections from all members)
