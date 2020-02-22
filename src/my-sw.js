async function createNotificationSubscription() {
  const serviceWorker = await navigator.serviceWorker.ready
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey
  })
}