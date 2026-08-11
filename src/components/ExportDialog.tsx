import { useEffect, useRef } from 'react'
import styles from './ExportDialog.module.css'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface ExportDialogProps {
  fileName: string
  onFileNameChange: (value: string) => void
  onConfirm: () => void
  onCancel: () => void
}

export function ExportDialog({ fileName, onFileNameChange, onConfirm, onCancel }: ExportDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useFocusTrap<HTMLDivElement>(onCancel)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const trimmed = fileName.trim()

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (trimmed) onConfirm()
          }}
        >
          <p id="export-dialog-title" className={styles.title}>
            Export PDF
          </p>
          <p className={styles.subtitle}>Choose a file name for your CV.</p>
          <input
            ref={inputRef}
            className={styles.input}
            value={fileName}
            onChange={(e) => onFileNameChange(e.target.value)}
          />
          <p className={styles.suffix}>Saved as {trimmed || 'resume'}{trimmed.toLowerCase().endsWith('.pdf') ? '' : '.pdf'}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.confirmButton} disabled={!trimmed}>
              Export
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
