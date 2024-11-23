import { Button, Greeting } from "@/components";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ConfigurationProgress from "./ConfigurationProgress";
import { USER } from "@/types/user";
import api from "@/lib/api";
import show from "@/lib/toast";

interface PROPS {
    siteName: string,
    user: USER | undefined
}

export default function Configure({ siteName, user }: PROPS) {
    const [progress, setProgress] = useState(0);
    const totalRequests = 4;
    let completedRequests = 0;
    let progressInterval: any;
    const startProgress = () => {

        if (progress < 0) return 0
        else {
            // Clear any existing interval to avoid duplication
            clearInterval(progressInterval);

            // Start a new interval to increment progress gradually
            progressInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    // Keep increasing until it reaches close to 100, but not exactly 100
                    if (prevProgress < 94) {
                        return prevProgress + 1; // Adjust increment for smoother/slower/faster effect
                    }
                    return prevProgress;
                });
            }, 1150); // Adjust interval time for speed of increment
        }

    };
    const finalizeProgress = () => {
        completedRequests += 1;

        if (completedRequests === totalRequests) {
            // When all requests complete, clear the interval and set progress to 100
            clearInterval(progressInterval);
            setProgress(99);
        }
    };
    useEffect(() => {
        return () => clearInterval(progressInterval);
    }, []);

    const [configuration, setConfiguration] = useState({
        status: "Ready for setup",
        saas: false,
        site: false,
        nginx: false,
        ssl: false,
        erpnext: false,
        failed: false,
        succeed: false
    })

    const startConfiguration = () => {
        createSite()
    }

    const createSite = () => {
        startProgress();
        setConfiguration({ ...configuration, status: "Creating Frappe Site ..." })
        const payload = {
            "name": user?.firstName,
            "email": user?.email,
            "siteName": siteName,
            "ownerId": user?._id,
            "status": "site created",
            "quota": {
                "ram": "2GB",
                "cpu": "2 cores",
                "storage": "20GB",
                "bandwidth": "100GB"
            }
        }
        api.create(payload, "/create-site")
            .then(() => {
                setConfiguration({ ...configuration, site: true })
                configureNginx()
            })
            .catch(() => {
                setConfiguration({ ...configuration, site: false, failed: true })
                show.error(`Unable to create site ${siteName} right now. Try again.`)
                setProgress(-1)
            })
    }
    const configureNginx = () => {
        setConfiguration({ ...configuration, status: "Configuring NGINX ..." })
        const payload = { siteName: siteName, }
        api.create(payload, "/configure-nginx")
            .then(() => {
                setConfiguration({ ...configuration, nginx: true })
                installSSLL()
            })
            .catch(() => {
                show.error(`Unable to configure nginx to domain name ${siteName} right now. Try again.`)
                setConfiguration({ ...configuration, nginx: false, failed: true })
                setProgress(-1)
            })
    }
    const installSSLL = () => {
        setConfiguration({ ...configuration, status: "Installing SSL Certificate ..." })
        const payload = {
            "siteName": siteName,
            "validEmail": user?.email
        }
        api.create(payload, "/setup-ssl")
            .then(() => {
                setConfiguration({ ...configuration, ssl: true })
                installERPNext()
            })
            .catch(() => {
                show.error(`Unable to install ssl certificate to domain name ${siteName} right now. Try again.`)
                setConfiguration({ ...configuration, ssl: false, failed: true })
                setProgress(-1)
            })

    }
    const installERPNext = () => {
        setConfiguration({ ...configuration, status: "Installing ERPNext ..." })
        const payload = {
            "siteName": siteName,
            "app": "erpnext"
        }
        api.create(payload, "/install-app")
            .then(() => {
                setConfiguration({ ...configuration, erpnext: true, succeed: true, status: `Your SaaS ${siteName} has been created successfully` })
            })
            .catch(() => {
                show.error(`Unable to install ERPNext to site ${siteName} right now. Try again.`)
                setConfiguration({ ...configuration, erpnext: false, failed: true })
                setProgress(-1)
            })
            .finally(() => {
                setProgress(99)
                finalizeProgress();
            });
    }

    return <div className="p-2 py-10">
        <Greeting name={user?.firstName || ""} />
        {
            configuration.status == "Ready for setup" ?
                <div className="py-8">
                    <h1 className="md:text-lg text-center text-gray-600">
                        Your new SaaS site, <span className="text-blue-600 italic">{siteName}</span> is ready for you! Get started with the configuration, and take it live whenever {"you're"} ready.
                    </h1>
                    <div className="py-10 flex justify-center">
                        <Button
                            title="Get started here"
                            isLoading={false}
                            onclick={startConfiguration}
                            py="py-3"
                            showNextIcon
                        />
                    </div>
                </div>
                : <ConfigurationProgress
                    status={configuration.status}
                    progress={Math.floor(progress)}
                    domainName={siteName}
                    failed={configuration.failed}
                    succeed={configuration.succeed}
                />
        }
    </div>
}