$SiteURL = "https://agtechnologiespvtltd.sharepoint.com/sites/AAFIntranetDev/"
# Connects and Creates Context 
$login = 'rajat.sahani@ag-technologies.com';
$pwd = 'A@gt@12@2020'
$cred = New-Object -TypeName System.Management.Automation.PSCredential -argumentlist $login, $(convertto-securestring $pwd -asplaintext -force)

Connect-PnPOnline -Url $SiteURL -Credentials $cred


Get-PnPProvisioningTemplate -Handlers Lists -ListsToExtract 'FieldsConfig' -Out .\FieldsConfig.xml 