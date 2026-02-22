use crate::error::{AppResult, IpcResult, MutexResultExt};
use crate::mods::{BulkInstallResult, CslolModInfo, ModLibraryState};
use crate::patcher::PatcherState;
use crate::state::SettingsState;
use std::path::PathBuf;
use tauri::State;

use super::mods::reject_if_patcher_running;

/// Scan a cslol-manager directory for importable mods.
#[tauri::command]
pub fn scan_cslol_mods(directory: String) -> IpcResult<Vec<CslolModInfo>> {
    let result: AppResult<Vec<CslolModInfo>> =
        crate::mods::scan_cslol_directory(&PathBuf::from(directory));
    result.into()
}

/// Import selected mods from a cslol-manager installation.
#[tauri::command]
pub fn import_cslol_mods(
    directory: String,
    selected_folders: Vec<String>,
    library: State<ModLibraryState>,
    settings: State<SettingsState>,
    patcher: State<PatcherState>,
) -> IpcResult<BulkInstallResult> {
    let result: AppResult<BulkInstallResult> = (|| {
        reject_if_patcher_running(&patcher)?;
        let settings = settings.0.lock().mutex_err()?.clone();
        crate::mods::import_cslol_mods(
            &library.0,
            &settings,
            &PathBuf::from(&directory),
            &selected_folders,
        )
    })();
    result.into()
}
